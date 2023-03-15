const image = document.getElementById("image");

const setUrlAddress = function (tag, event) {
    tag.src = event.target.result;
}

function readURL(input, setUrlAddress) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            setUrlAddress(document.getElementById('preview'), e);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById('preview').src = "/uploads/no-image.png";
    }
}