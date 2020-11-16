import $ from 'jquery';
import 'bootstrap';
import '../scss/main.scss';


$('.sidebar__list__item').each(function(){
  const link =  $(location).attr("href");
  if (link.includes($(this).find('span').text())) {
    $(this).find('a').addClass('active');
  } else {
    $(this).find('a').removeClass('active');
  }
})

$('#topbar__dropdown__btn').on('click', function() {
  $('#topbar__dropdown').toggleClass('show');
});

$('#assignment__list__btn').on('click', function() {
  $(this).find('.dropdown__item__icon').toggleClass('close');
  $('#assignment__list').slideToggle();
});

$('#reply').on('click', function(){
  $('#richtext').toggleClass('show');
});

$('#richtext__cancel').on('click', function() {
  $('#richtext').removeClass('show');
});

let currentData = {};
let action = null;

$('#addAdmin').on('click', function() {
  action = $(this).data('action');
  $('#myModal').modal('show');
});

const createTable = () => {
  const tableData = [
    { id: 1, name: 'Emir Wicks', email: 'emir.wicks@mail.com', verified: true},
    { id: 2, name: 'Zaina Goldsmith', email: 'zaina.goldsmith@mail.com', verified: true},
    { id: 3, name: 'Mahima Lopez', email: 'Mahima.Lopez@mail.com', verified: true},
    { id: 4, name: 'Pharrell Murray', email: 'Pharrell.Murray@mail.com', verified: true},
    { id: 5, name: 'Annika Mcbride', email: 'Annika.Mcbride@mail.com', verified: true},
    { id: 6, name: 'Fatimah Clark', email: 'Fatimah.Clark@mail.com', verified: true},
    { id: 7, name: 'Klaudia Rhodes', email: 'Klaudia.Rhodes@mail.com', verified: true},
    { id: 8, name: 'Tillie Lucero', email: 'Tillie.Lucero@mail.com', verified: true},
    { id: 9, name: 'Sabrina Stephenson', email: 'Sabrina.Stephenson@mail.com', verified: true},
    { id: 10, name: 'Annie Smith', email: 'Annie.Smith@mail.com', verified: true},
  ];

  const initTable = () => {
    const items = tableData.reduce((pre, item, index) => `${pre}
      <tr>
        <td>#${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.verified ? 'YES' : 'NO'}</td>
        <td>
          <a href="#" class="admin__view" data-action="view" data-index="${index}"><i class="material-icons">remove_red_eye</i></a>
          <a href="#" class="admin__edit" data-action="edit" data-index="${index}"><i class="ml-2 material-icons">edit</i></a>
        </td>
      </tr>`, '');

    $('#admin__table tbody').html(items);

    $('.admin__view').each(function() {
      $(this).on('click', function(e) {
        e.preventDefault();
        currentData = {
          ...tableData[$(this).data('index')],
        };
        action = $(this).data('action');
        $('#myModal').modal('show');
      });
    });

    $('.admin__edit').each(function() {
      $(this).on('click', function(e) {
        e.preventDefault();
        currentData = {
          index: $(this).data('index') + 1,
          ...tableData[$(this).data('index')],
        };
        action = $(this).data('action');
        $('#myModal').modal('show');
      });
    });
  }
  initTable();
  $('.sort__btn').on('click', function() {
    $(this).find('.material-icons').toggleClass('rotate');
    tableData.reverse();
    initTable();
  })
};

function modalView(modal) {
  const closeBtn = modal.find('.close').clone();
  if (modal.find('.modal-header')) {
    modal.find('.modal-header').remove();
  }
  if (modal.find('.modal-footer')) {
    modal.find('.modal-footer').remove();
  }
  const body = `
  <div class="modal__view">
    <div class="modal__view__img mr-3">
      <img src="https://github.com/hexschool/webLayoutTraining1st/blob/master/week5/emir.jpeg?raw=true" />
    </div>
    <div class="modal__view__content">
      <div class="modal__view__content__id mb-2">#${currentData.id}</div>
      <div>Admin</div>
      <h4 class="font-weight-bold h4">${currentData.name}</h4>
      <div class="text-secondary mb-3 small__text">${currentData.email}</div>
      <div class="d-flex justify-content-between">
        <span class="highlight small__text">${currentData.verified ? 'Verified' : 'Unverified'}</span>
        <a href="#" class="control__collapse__btn"><i class="material-icons">keyboard_arrow_down</i></a>
      </div>
    </div>
  </div>
  <div class="justify-content-end px-4 modal__view__control hide">
    <button class="btn btn-outline-danger">Deactivate</button>
    <button class="ml-2 btn btn-primary">Edit</button>
  </div>
  `
  modal.find('.modal-body').html(body);
  modal.find('.modal__view__content').prepend(closeBtn);


  $('.control__collapse__btn').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('show');
    $('.modal__view__control').toggleClass('hide');
  });
  currentData = {};
}

function modalAdmin(modal) {
  const closeBtn = modal.find('.close').clone();
  modal.find('.modal-header').remove();
  const body = `
    <div class="p-2 modal__admin">
      <h4 class="font-weight-bold h4 modal__admin__title">New Admin</h4>
      <div class="pb-3 modal__admin__content">
        <h5 class="mb-2 font-weight-bold h5">Account</h5>
        <div class="form-group">
          <label for="name">Name</label>
          <input class="p-3 input" id="name" name="name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input class="p-3 input" id="email" name="email" />
        </div>
      </div>
      <div class="modal__admin__content">
        <h5 class="mb-2 font-weight-bold h5">Verification</h5>
        <div class="d-flex justify-content-between verify">
          <div class="mb-2 d-flex align-items-center">
            <i class="text-danger material-icons">warning</i>
            <span class="ml-1 font-weight-bold">Unverified</span>
          </div>
        </div>
        <button class="w-100 py-3 mb-4 btn btn-outline-primary">Send Verification Mail</button>
      </div>
      <div class="modal__admin__content">
        <h5 class="mb-2 font-weight-bold h5">Access Level</h5>
        <div class="p-3 mb-4 d-flex align-items-center justify-content-between selector">
          <span>-Choose access level-</span>
          <i class="material-icons">keyboard_arrow_down</i>
        </div>
      </div>
    </div>
  `;

  modal.find('.modal-body').html(body);
  const footer = modal.find('.modal-footer')
  if (!footer.length) {
    modal.find('.modal-body').after('<div class="modal-footer"></div>');
  }
  modal.find('.modal-footer').html(`
    <button type="button" class="btn btn-outline-primary closeBtn">Cancel</button>
    <button type="button" class="btn btn-primary">Add</button>
  `)
  modal.find('.modal__admin').prepend(closeBtn);

  document.querySelector('.closeBtn').addEventListener('click', function() {
    $('#myModal').modal('hide');
  });

  if (currentData.index) {
    modal.find('#name').val(currentData.name).addClass('bg-light border-0');
    modal.find('#email').val(currentData.email).addClass('bg-light border-0');
    modal.find('.verify .material-icons')
      .text('check_circle').removeClass('text-danger')
      .next().html('Verified');
    modal.find('.verify').append('<div>2020/04/22</div>');
    modal.find('.verify').next().addClass('disabled');
    modal.find('.selector span').text('Admin');
  }
  currentData = {};
}

$('#myModal').on('show.bs.modal', function (event) {
  const modal = $(this);
  switch (action) {
    case 'view':
      modalView(modal);
      return;
    case 'add':
      modalAdmin(modal);
      return;
    case 'edit':
      modalAdmin(modal);
      return;
  }
});

createTable();
