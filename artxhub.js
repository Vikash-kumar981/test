jQuery(document).ready(function($){
    
  // Show loader
  function showLoader(){
      $('#page_loader').css('opacity', 1);
  }
  
  
  // Hide loader
  function hideLoader(){
      $('#page_loader').css('opacity', 0);
  }
  // showLoader();
 
  
      // Cache jQuery objects for performance
      const $fileInput = $('#profilePic');
      const $fileNameDisplay = $('#profilepicID');
      const $profilePicLabel = $('#profilePicLabel');

      const $uploadInput = $('#browserFile');
      const $uploadDisplay = $('#browserID');
      const $browserFileLabel = $('#browserFileLabel');

      // Event handler for profile picture file input change
      $fileInput.on('change', function() {
          const files = $fileInput.prop('files'); // Get the files property

          if (files.length > 0) {
              // Get the name of the first selected file
              const fileName = files[0].name;
              // Display the file name
              $fileNameDisplay.html(`${fileName}&nbsp;&nbsp;X`);

              // Change the h3 text to 'UPLOAD SUCCESSFULLY'
              $profilePicLabel.text('UPLOAD SUCCESSFULLY');
           } else {
              // If no file selected, reset text
              $fileNameDisplay.text('');
              $profilePicLabel.text('UPLOAD PROFILE PICTURE');
           }
      });

      // Event handler for portfolio file input change
      $uploadInput.on('change', function() {
          const files = $uploadInput.prop('files'); // Get the files property

          if (files.length > 0) {
              // Get the name of the first selected file
              const fileName = files[0].name;
              // Display the file name
              $uploadDisplay.html(`${fileName}&nbsp;&nbsp;X`);

              // Change the h3 text to 'UPLOAD SUCCESSFULLY'
              $browserFileLabel.text('UPLOAD SUCCESSFULLY');
           } else {
              // If no file selected, reset text
              $uploadDisplay.text('');
              $browserFileLabel.text('UPLOAD YOUR PORTFOLIO');
           }
      });

      // Optional: Click the image to trigger file input
      $('#uploadImage1').on('click', function() {
          $fileInput.trigger('click');
      });

      $('#uploadImage2').on('click', function() {
          $uploadInput.trigger('click');
      });

// Select the file input and label
const fileInput = document.getElementById('file-upload');
const fileLabel = document.getElementById('file-upload-label');
const fileNameDisplay = document.getElementById('file-upload-name');

// Event listener for file input change
fileInput.addEventListener('change', function() {
  const files = fileInput.files;

  if (files.length > 0) {
      // Get the name of the first selected file
      const fileName = files[0].name;

      // Display the file name in the paragraph element
      // fileNameDisplay.textContent = `${fileName}`;

      // Change the label text to 'UPLOADED'
      fileLabel.textContent = 'UPLOADED';
   } else {
      // If no file selected, reset the label and text
      fileNameDisplay.textContent = '';
      fileLabel.textContent = 'UPLOAD FILE';
   }
});

  
  
  
  
  console.log('hello page');
  
  $('#validate_invitation_code').on('click', function(event) {
      event.preventDefault(); // Prevent the default form submission behavior
      localStorage.clear();
      // Get input values
      console.log('hi event');
      let emailAddress = $('#user_email').val();
      let invitationCode = $('#invitation_code').val();
      
      console.log(emailAddress);
      console.log(invitationCode);
      if(!emailAddress || !invitationCode){
          alert("Input rquired fields.");
          return 
      }
  
      // Make AJAX request
      showLoader();
      $.ajax({
          url: ajax_object.ajax_url,
          type: 'post',
          data: {
              action: 'validate_invitation_code',
              emailAddress: emailAddress,
              invitationCode: invitationCode
          },
          success: function(response) {
              hideLoader();
              try {
                  response = JSON.parse(response);
                  if (response.success === true) {
                      localStorage.setItem('emailAddress', emailAddress);
                      $('#usr-email').html(emailAddress); // Update HTML with email address
                      $('#code-validation-container').hide(); // Hide code validation container
                      $("#personal-details-container").show(); // Show personal details container
                      console.log(response.message); // Log success message
                      
                  } else {
                      alert(response.message); // Show error message in an alert
                  }
              } catch (e) {
                  console.error('Error parsing JSON response:', e);
                  alert('An unexpected error occurred. Please try again.');
              }
          },
          error: function(xhr, status, error) {
              hideLoader();
              console.error('AJAX Error:', status, error);
              alert('An error occurred while processing your request. Please try again.');
          }
      });
  });

  
  // if code is validated
  $("#submit_details-btn").on('click', function(event){
      event.preventDefault();
      let emailAddress = localStorage.getItem('emailAddress');
      let usrName         =   $('#username').val();
      let phoneNumber     =   $('#phone_number').val();
      let password        =   $('#password').val();
      let confirmPassword =   $('#cnfrm_pswrd').val();
      let lastName        =   $('#last_name').val();
      let firstName       =   $('#first_name').val();
  
      
      if (!emailAddress || !usrName || !phoneNumber || !password || !confirmPassword || !lastName || !firstName) {
          alert("Please fill in all required fields");
          return;
      }

      
      if(password !== confirmPassword){
          alert('Password is not match.');
          return;
      }
      
      showLoader();
      $.ajax({
          url: ajax_object.ajax_url,
          type: 'post',
          data: {
              action: 'register_new_artist',
              emailAddress: emailAddress,
              usrName: usrName,
              phoneNumber: phoneNumber,
              password: password,
              confirmPassword: confirmPassword,
              firstName: firstName,
              lastName: lastName, 
          }, 
          success:function(response){
              hideLoader();
              // response = JSON.parse(response);
              if(response.success === true){
                  $("#personal-details-container").hide();
                  $('#select-group-container').show();
              } else{
                  let data = response.data;
                  alert(data.message);
              }
              console.log(response);
          },
          error:function(error){
              hideLoader();
              alert(error.message);
              console.log(error);
          }
      })
  });
  
  
  //  function getSelectedCheckboxes() {
  //     var selected = [];
      
  //     // Iterate over each checked checkbox
  //     $('input[type="checkbox"]:checked').each(function() {
  //         selected.push($(this).attr('name')); // Get the name attribute of the checkbox
  //     });
  //     console.log(selected);

  //     return selected;
  // }

  // Example usage: print the selected checkboxes to the console
  // $('#yourButtonId').click(function() { // Replace #yourButtonId with the ID of your button or element
  //     var selectedCheckboxes = getSelectedCheckboxes();
  //     console.log(selectedCheckboxes);
  // });
  
  
  // Join buddypress group
  $('#add_to_group_btn').on('click', function(event){
      event.preventDefault();
      // let groupID = $('#select_bp_group option:selected').data('selectedgroup');
      // let groupID = getSelectedCheckboxes();
      let userID = $('#crnt_usr_id').val();
      let groupID;
      var selectedGroups = [];
      $('input[name="groups[]"]:checked').each(function() {
          selectedGroups.push($(this).val());
      });

      console.log(selectedGroups);
      if(!selectedGroups){
          alert("Please select a group alert1");
          return;
      }
      showLoader();
      $.ajax({
          url: ajax_object.ajax_url,
          type: 'post', 
          data:{
              action: 'join_buddypress_group',
              group_ids: selectedGroups,
              user_id : userID
          },
          success:function(response){
              hideLoader();
              if(response.success === true){
                  $('#select-group-container').hide();
                  $('#upload-file-container').show();
                  // window.location.href = response.data.redirect_url;
              } else{
                  let data = response.data;
                  alert(data.message);  
              }
              console.log(response);
          },
          error:function(error){
              hideLoader();
              console.log(error);
          }
      })
  });
  
  
  // Submit portfolio 
 $('#create-story-form').on('submit', function(event) {
      event.preventDefault();  // Prevent the default form submission
  
      // Collect form data
      var formData = new FormData(this);
  
      // Include any additional data (e.g., action for WP AJAX handler)
      formData.append('action', 'handle_nightlife360_form_submission');
      
      let img = $('#file-upload').val();
      console.log(img);
  
      // Perform AJAX request
      showLoader();
      $.ajax({
          url: ajaxurl,  // Ensure ajaxurl is defined in your theme or plugin
          type: 'POST',
          data: formData,
          contentType: false,  // Required for file upload
          processData: false,  // Required for file upload
          success: function(response) {
              hideLoader();
              console.log(response);
              if (response.success === true) {
                  window.location.href = response.data.post_url;
              } else {
                  alert("Error occurred while creating story: " + response.data.message);
              }
          },
          error: function(xhr, status, error) {
              hideLoader();
              console.error('AJAX Error:', status, error);
              alert('An error occurred while submitting the form. Please try again.');
          }
      });
  });



  
  // Affiliate user 
  $("#affiliate_artist_btn").on('click', function(event){
      event.preventDefault();
      let artistName = $('#artist-name').val();
      let artistEmail = $('#artist-email').val();
      // let artistBio = $('#artist-bio').val();
      let affiliateID = $('#affiliate-id').val();
      // || !artistBio
      if(!artistName || !artistEmail){
          alert("Please fill required field.");
          return;
      }
      
      $.ajax({
          url: ajax_object.ajax_url,
          type: 'post',
          data:{
              action: 'handle_affiliate_form',
              artistName: artistName,
              artistEmail: artistEmail,
              // artistBio: artistBio,
              affiliateID: affiliateID
          },
          success:function(response){
              console.log(response);
              alert(response);
          },
          error: function(error){
              console.log(error);
              alert(error);
          }
      })
  });
  
  // Add profile photo
  $('#add_profile_bio_form').on('submit', function(event){
      event.preventDefault();
      
      let formData = new FormData(this);
      formData.append('action', 'add_profile_image_bio_action');
      
      showLoader();
      $.ajax({
          url: ajax_object.ajax_url,
          type: 'post',
          data: formData,
          contentType: false,  // Required for file upload
          processData: false,
          success:function(response){
              // console.log(response);
              hideLoader();
              $('#upload-file-container').hide();
              $('#featured-story-container').show();
          },
          error:function(error){
              hideLoader();
              // console.log(error);
              alert("Unexpected error occured. Please try after some time.");
          }
      })
  })
  
  
  
  
  

});