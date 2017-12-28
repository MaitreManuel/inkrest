(function(self){
  self.init_navlogin = () => {
    var login = document.querySelector('#login'),
      login_content = document.querySelector('#login-content'),
      mail = document.querySelector('input[name=mail]'),
      password = document.querySelector('input[name=password]');

    if(login) {
      login.addEventListener('mouseover', () => {
        login.classList.add('hover');
      });
      login_content.addEventListener('mouseleave', () => {
        login.classList.remove('hover');
      });
      login.addEventListener('focusin', () => {
        login.classList.add('hover');
      });
      if(mail && password) {
        mail.addEventListener('focusin', () => {
          login.classList.add('hover');
        });
        password.addEventListener('focusin', () => {
          login.classList.add('hover');
        });
        login.addEventListener('focusout', () => {
          login.classList.remove('hover');
        });
        mail.addEventListener('focusout', () => {
          login.classList.remove('hover');
        });
        password.addEventListener('focusout', () => {
          login.classList.remove('hover');
        });
      }
    }
  };
})(typeof self !== 'undefined' ? self : this);
