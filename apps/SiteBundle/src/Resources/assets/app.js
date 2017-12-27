import ClipPath from 'clip-path';
import domready from 'domready';
import 'jquery';
import 'bootstrap';

import './main.scss';
import './js/waves.js';

domready(() => {
  // dangerous zone (jQuery)

  // variables
  var rbefore = document.querySelector('.ring-before'),
    rbbefore = document.querySelector('.ring-bigger-before'),
    rafter = document.querySelector('.ring-after'),
    rbafter = document.querySelector('.ring-bigger-after'),
    login = document.querySelector('#login'),
    login_content = document.querySelector('#login-content'),
    mail = document.querySelector('input[name=mail]'),
    password = document.querySelector('input[name=password]');

  // polyfill clip-path
  if(rbefore && rbbefore && rafter && rbafter) {
    ClipPath('.ring-before', '50% 0 0 0');
    ClipPath('.ring-bigger-before', '50% 0 0 0');
    ClipPath('.ring-after', '0 0 50% 0');
    ClipPath('.ring-bigger-after', '0 0 50% 0');
  }

  // listener hover login content
  if(login && mail && password) {
    login.addEventListener('mouseover', () => {
      login.classList.add('hover');
    });
    login_content.addEventListener('mouseleave', () => {
      login.classList.remove('hover');
    });
    login.addEventListener('focusin', () => {
      login.classList.add('hover');
    });
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
});
