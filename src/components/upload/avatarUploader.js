import React from "react";
import Dropzone from "react-dropzone";
import './style.scss'
// for profile picture
class AvatarUploader extends React.Component {
  state = { warningMsg: "" };

  onDrop = (accepted, rejected) => {
    if (Object.keys(rejected).length !== 0) {
      const message = "Please submit valid file type";
      this.setState({ warningMsg: message });
    } else {
      this.props.addFile(accepted);
      this.setState({ warningMsg: "" });
      console.log(accepted[0].preview);

      var blobPromise = new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(accepted[0]);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      blobPromise.then(value => {
        // console.log(value);
      });
    }
  };

  render() {
    const { files, name, caption } = this.props;
    const thumbsContainer = {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center",
      background: 'lightgrey'
    };


    return (
      <div className="avatar-uploader">
        <Dropzone 
            multiple={false}
            accept="image/*"
            onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}>
            {({getRootProps, getInputProps}) => (
                  <div className="d-flex" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div style={{position: 'relative'}}>
                    {
                      Object.keys(files).length !== 0 ? (
                        files.map((file, index) => (
                        <img style={thumbsContainer} key={index} src={file.preview} alt="profile" />
                      ))):(<div style={thumbsContainer}/>)
                    }
                      <span className="circle-btn">+</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <p className="username mb-2">{name}</p>
                      <span className="caption text-primary d-md-down-none">{caption}</span>
                    </div>
                  </div>
            )}
        </Dropzone>
        
      </div>
    );
  }
}

export default AvatarUploader;
