import '../scss/main.scss';
import $ from 'jquery';
import 'bootstrap'

if (JSON.parse(sessionStorage.getItem('login'))) {
  $('.member-nav').each(function() {
    $(this).addClass('d-flex');
    $(this).removeClass('d-none');
  });
  $('.login-nav').each(function() {
    $(this).addClass('d-none');
    $(this).removeClass('d-flex');
  })
} else {
  $('.member-nav').each(function() {
    $(this).addClass('d-none');
    $(this).removeClass('d-flex');
  });
  $('.login-nav').each(function() {
    $(this).addClass('d-flex');
    $(this).removeClass('d-none');
  })
}

$('#productModal').on('show.bs.modal', function (e) {
  const keyword = {
    favorite: '我的收藏',
    addCart: '購物車',
  }
  const msg = `已加入${keyword[e.relatedTarget.id]}`;
  $('#msg').text(msg);

  setTimeout(() => {
    $(this).modal('hide');
  }, 1500);
})

$('#login').on('click', function(e) {
  sessionStorage.setItem('login', true);
  if ($('#account').val() && $('#pwd').val()) {
    location.href = '/hexschool_css/week6/dist/member.html'
  }
});