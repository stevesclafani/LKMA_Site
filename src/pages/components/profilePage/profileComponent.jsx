import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loggingOut, changeFilePath } from "../loginPage/loginComponent";
import { exportEmail, exportPassword, inputFirstName, inputLastName, filePath, 
  login } from "../loginPage/loginComponent";

var loggedIn = true;
var logOut = true;
var firstLogin = 0;
var tempImage = "";
var resetImage = false;
var uploadImage = false;

export const logIn = () => {
	logOut = false;
}

export const studentLogout = () => {
	logOut = true;
}

export const ProfileComponent = (props) => {
	/*		Code from last sprint
	const [regStatus, setRegStatus] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [uploadedFile, setUploadedFile] = useState({});

    const [submit, setSubmit] = useState("");
    const [uploadedSub, setUploadedSub] = useState("");

    const register = () => {
        const data = {email: emailReg, password: passwordReg};
        axios.post("http://localhost:3001/", data).then((response) => {
        setRegStatus(response.data.message); 
        console.log(response.data);
        }); 
    };

    const login = () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            axios.post("http://localhost:3001/login", formData).then((response) => {
                if (response.data.message !== "Wrong combination") {
                    setLoginStatus("Email: " + response.data.result[0].email);
        
                    const fileName = response.data.fileName;
                    const filePath = response.data.filePath;
                    setUploadedFile({fileName, filePath});
                } else {
                    setLoginStatus(response.data.message);
                }
                console.log(response.data);
            });
        } catch(err) {
            if (err.response.status === 500) {
                console.log("There was a problem with server.");
            } else {
                console.log(err.response.data.message);
            }
        }
    };

    const uploadImage = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('email', email);
        
        try {
            const res = await axios.post("http://localhost:3001/image", formData, {
                headers: {
                    "Content-Type": "mulitpart/form-data"
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({fileName, filePath});
        } catch(err) {
            if (err.response.status === 500) {
                console.log("There was a problem with server.");
            } else {
                console.log(err.response.data.message);
            }
        }
    }

    const uploadSub = async e => {
        e.preventDefault();
        
    }

    return(
        <div id='profile' >
            <div className="containerBlock">
                <ul>
                    <h1>Registration</h1>
                    <label>Email: </label>
                    <input type="text" onChange={(e) => {
                        setEmailReg(e.target.value);
                        }} 
                    />
                    <label>Password: </label>
                    <input type="text" onChange={(e) => {
                        setPasswordReg(e.target.value);
                        }} 
                    />
                    <button onClick={register}>Register</button>
                </ul>
            </div>
            <div className="containerBlock">
                <ul>
                    <h1>Login</h1>
                    <label>Email: </label>
                    <input data-testid="loginEmail" type="text" onChange={(e) => {
                        setEmail(e.target.value);
                        }} 
                    />
                    <label>Password: </label>
                    <input data-testid="loginPassword" type="text" onChange={(e) => {
                        setPassword(e.target.value);
                        }} 
                    />
                    <button data-testid="loginSubmit" onClick={login}>Login</button> 
                </ul>
            </div>
            <h1>{regStatus}</h1>

            <div className="profileInfo">
                <div className="subPortal">
                    <h1>Profile Picture</h1>
                    <img src={uploadedFile.filePath} alt="" /> 
                    <div className='row'>
                        <div className="login-form">
                            <input type="file" name="imageFile" accept="image/*" onChange={(e) => {
                                setImage(e.target.files[0]);
                                setImageName(e.target.files[0].name);
                            }}/>
                            <input data-testid="uploadSubmit" type="submit" value="Upload" onClick={uploadImage}/>
                        </div>
                    </div>

        </div>
    )
	*/
  

	const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
	const [profileEmail, setProfileEmail] = useState("");
	const [imageFilePath, setImageFilePath] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (loggedIn && login) {
			if (firstLogin < 5) {
				setImageFilePath(filePath);
				firstLogin++;
			}
      
      setFirstName(inputFirstName);
      setLastName(inputLastName);
			setProfileEmail(exportEmail);
			setImageFilePath(filePath);
		} else {
			setImageFilePath("\\img\\profile-blank-whitebg.png");
		}

		if (resetImage) {			
			const formData = new FormData();
			formData.append('email', exportEmail);
			formData.append('password', exportPassword);

			try {
				const res = axios.post("http://localhost:3001/retrieveImage", formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});

				const filePath = res.filePath;
				setImageFilePath(filePath);
				tempImage = filePath;				
			} catch (err) {
				if (err.response.status === 500) {
					console.log("There was a problem with server.");
				} else {
					console.log(err.response.data.message);
				}
			}

			resetImage = false;
		}

		if (uploadImage) {
			const formData = new FormData();

			if (tempImage != "") {
				formData.append('image', tempImage);
				formData.append('email', exportEmail);
	
				try {
					axios.post("http://localhost:3001/uploadImage", formData).then((response) => {	
						const filePath = response.data.filePath;
		
						changeFilePath(filePath);
						setImageFilePath(filePath);
						tempImage = "";
						uploadImage = false;
					});
				} catch (err) {
					if (err.response.status === 500) {
						console.log("There was a problem with server.");
					} else {
						console.log(err.response.data.message);
					}
				}
			}
		}
		
		if (logOut) {
			loggingOut();
      setFirstName("N/A");
      setLastName("N/A");
			setProfileEmail("N/A");
			setImageFilePath("\\img\\profile-blank-whitebg.png");
		}
	}, [uploadImage, tempImage, resetImage]);
	
	return (  
    <div id='student' className='text-center'>
		  <div className='container'>
			  <div className='section-title'>
				  <h2>Profile</h2>
			  </div>
        <div className='row'>
          <div className='row'>
            <img data-testid="profilePic" src={imageFilePath} />
            <h1 id="chosenImage"></h1>
          </div>
          <div className='row'>
            <div className="login-form">
              <label htmlFor="file-upload" className="custom-file">Choose File</label>
                <input data-testid="uploadFile" type="file" id="file-upload" 
                name="imageFile" accept="image/*" onChange={(e) => {
                  tempImage = e.target.files[0];

                  if (tempImage == undefined) {
                    resetImage = true;
                    document.getElementById("chosenImage").innerHTML = "";
                  }	else {
                    document.getElementById("chosenImage").innerHTML 
                      = tempImage.name;
                  }							
                  uploadImage = false;
                }} />
              <NavLink className="nav-link" to="/profile">
                <input data-testid="uploadSubmit" type="submit" 
                value="Upload Image" onClick={() => {
                  if (tempImage != undefined) {
                    uploadImage = true;
                    resetImage = false;
                    document.getElementById("chosenImage").innerHTML = "";
                  }
                }} />
              </NavLink>
            </div>
          </div>
          <div className="column">
            <h1 data-testid="firstName">{firstName}</h1>
            <h1 data-testid="lastName">{lastName}</h1>
            <NavLink className="nav-link" to="/login">
              <button data-testid="logOut" className="ghost" id="logIn" onClick={() => {
                logOut = true;
              }}>Log out</button>
            </NavLink>
          </div>
          <div className="column">
            <h1 data-testid="profileEmail">{profileEmail}</h1>
            {/*If Phone # is in DB, display, else display Add Phone Button.*/}
            <h1>Phone # Here</h1>
            <button>Add Phone</button>
          </div>
        </div>
        <div className='row'>
          <div className="column">
            <NavLink to="/ChangeEmail">
              <button>Change Email</button>
            </NavLink> 
          </div>
          <div className="column">
            <NavLink to="/ResetPassword">
              <button>Change Password</button>
            </NavLink> 
          </div>
        </div>
        <div className='row'>
          <div className="column">
            <a href={props.data ? props.data.uploadLink : ""} target="_blank">
              <button>Upload Assignment</button>
            </a>
          </div>
          <div className="column">
            <a href={props.data ? props.data.downloadLink : ""} target="_blank">
              <button>Download Assignment</button>
            </a>
          </div>
        </div>
      </div>
		</div>
	)
}

export const resetTempImage = () => {
	tempImage = "";
}