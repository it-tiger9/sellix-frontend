import React from "react";
import Dropzone from "react-dropzone";
import './style.scss'
// for profile picture
class ImageUpload extends React.Component {
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
    const { files } = this.props;
    const thumbsContainer = {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center"
    };

    const thumbs = files.map((file, index) => (
      <img style={thumbsContainer} key={index} src={file.preview} alt="profile" />
    ));

    return (
      <div className="image-uploader">
        <Dropzone 
            multiple={false}
            accept="image/*"
            onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}>
            {({getRootProps, getInputProps}) => (
                Object.keys(files).length !== 0 ? (
                    files.map((file, index) => <aside key={index}>{thumbs}</aside>)
                  ) : (
                    <div {...getRootProps()} className="drag-drop-area">
                        <input {...getInputProps()} />
                        <i className="fas fa-file-upload mb-2"/><br/>
                        <p className="caption">Drag and drop files here</p>
                        <p className="warning">{this.state.warningMsg}</p>
                    </div>
                  )
            )}
        </Dropzone>
        
      </div>
    );
  }
}

export default ImageUpload;
