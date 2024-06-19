const firebaseConfig = {
    apiKey: "AIzaSyBWVbEGu6Tu14uoRxlQ8cbeM_MjrPJGQEs",
    authDomain: "drive-clone-m.firebaseapp.com",
    projectId: "drive-clone-m",
    storageBucket: "drive-clone-m.appspot.com",
    messagingSenderId: "1077754017234",
    appId: "1:1077754017234:web:f1d94f0ac0ad5e6624040b",
    measurementId: "G-0LC6BWNZVC"
};
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();


const firestore = firebase.firestore();
const uploadsCollection = firestore.collection('uploads');

const fileUploadElement = document.querySelector('#second-section a:nth-child(1)');
fileUploadElement.addEventListener("click", function() {
    fileInput.click();
});
var fileItem;
var fileName;

window.onload = function() {
    loadUploadedFiles();
};

function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileSize = fileItem.size;
    let storageref = firebase.storage().ref("uploads/" + fileName);
    let uploadTask = storageref.put(fileItem);

    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot);
    }, (error) => {
        console.log("error is ", error);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("URL", url);
            const timestamp = firebase.firestore.Timestamp.now();
            const fileData = {
                timestamp: timestamp,
                name: fileName,
                url: url,
                size: fileSize
            };
            uploadsCollection.add(fileData).then((docRef) => {
                console.log('File data stored in Firestore:', docRef.id);
                addFileToList(docRef.id, fileData);
            }).catch((error) => {
                console.error('Error adding document to Firestore:', error);
            });
        });
    });
}

function loadUploadedFiles() {
    uploadsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const fileData = doc.data();
            addFileToList(doc.id, fileData);
        });
    }).catch((error) => {
        console.error('Error fetching documents:', error);
    });
}

function addFileToList(docId, fileData) {
    const fileListContainer = document.getElementById('file-list');
    const listItem = document.createElement('li');

    const Name = document.createElement('p');
    Name.textContent = fileData.name;
    listItem.appendChild(Name);

    const fileInfo = document.createElement('p');
    fileInfo.textContent = `${fileData.size} bytes`;
    listItem.appendChild(fileInfo);

    const owner = document.createElement('p');
    owner.textContent = `Me`;
    listItem.appendChild(owner);

    const timestampParagraph = document.createElement('p');
    timestampParagraph.textContent = fileData.timestamp.toDate().toLocaleString();
    listItem.appendChild(timestampParagraph);

    const downloadLink = document.createElement('a');
    downloadLink.href = fileData.url;
    downloadLink.download = '';
    downloadLink.textContent = 'Download';
    listItem.appendChild(downloadLink);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteFile(docId, fileData.url);
    });
    listItem.appendChild(deleteButton);

    fileListContainer.appendChild(listItem);
}

function deleteFile(docId, url) {
    const storageRef = firebase.storage().refFromURL(url);
    storageRef.delete().then(() => {
        console.log('File deleted from Storage');
        uploadsCollection.doc(docId).delete().then(() => {
            console.log('File data deleted from Firestore');
            const fileListContainer = document.getElementById('file-list');
            while (fileListContainer.firstChild) {
                fileListContainer.removeChild(fileListContainer.firstChild);
            }
            loadUploadedFiles();
        }).catch((error) => {
            console.error('Error deleting file data from Firestore:', error);
        });
    }).catch((error) => {
        console.error('Error deleting file from Storage:', error);
    });
}



//firebase authentication


document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');
    const loginButton = document.getElementById('login-button');
    const profilePicture = document.getElementById('profile');
  
    
    loginButton.addEventListener('click', () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'  
      });
      auth.signInWithPopup(provider)
        .then(result => {
          
          const user = result.user;
          showMainContent(user);
        })
        .catch(error => {
          console.error('Error during sign in:', error);
        });
    });
  
   
    function showMainContent(user) {
      loginContainer.style.display = 'none';
      mainContent.style.display = 'block';
      profilePicture.src = user.photoURL;
    }
  
   
    auth.onAuthStateChanged(user => {
      if (user) {
        showMainContent(user);
      } else {
        showLoginScreen();
      }
    });

    profilePicture.addEventListener('click', () => {
      if (confirm('Do you want to log out?')) {
        auth.signOut()
          .then(() => {
        
            showLoginScreen();
          })
          .catch(error => {
            console.error('Error during sign out:', error);
          });
      }
    });

    function showLoginScreen() {
      loginContainer.style.display = 'block';
      mainContent.style.display = 'none';
    }
  });
  
