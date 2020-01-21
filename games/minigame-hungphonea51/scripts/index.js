const dataTableOption = {
    "scrollX"   : true,
    "lengthMenu": [[10, 25, 50], [10, 25, 50]],
    "language"  : {
        "lengthMenu"  : "Hiển thị _MENU_ kết quả",
        "zeroRecords" : "Không có kết quả",
        "info"        : "Hiển thị trang _PAGE_ trên _PAGES_",
        "infoEmpty"   : "Không có kết quả",
        "infoFiltered": "(Tìm kiếm trong _MAX_ kết quả)",
        "paginate"    : {
            "first"   : "Trang đầu",
            "last"    : "Trang cuối",
            "next"    : "Sau",
            "previous": "Trước"
        },
        "search"      : "Tìm kiếm:",
    },
    responsive  : true
};

function checkLogin(e) {
    let user            = getStorage("user"); // user object contains phone + name
    let tmpNewPlayer    = $("#new-player").contents().clone();
    if (!user || !user.phone || !user.phone.match(/^[0-9]{10}$/g)) {
        $.confirm({
                      title  : 'Thông tin người chơi',
                      content: tmpNewPlayer,
                      buttons: {
                          formSubmit: {
                              text    : 'Chơi',
                              btnClass: 'btn-blue',
                              action  : function () {
                                  let name = this.$content.find('.name-input').val();
                                  let phone = this.$content.find('.phone-input').val();
                                  if (!name) {
                                      warning('Bạn chưa nhập họ tên');
                                      return false;
                                  }
                                  if (!phone.match(/^[0-9]{10}$/g)) {
                                      warning('Số điện thoại không đúng định dạng');
                                      return false;
                                  }
                                  checkUser(name, phone);

                              }
                          },
                          cancel    : {
                              text    : 'Hủy',
                              btnClass: 'btn-red',
                              action  : function () {
                              }
                          },
                      },
                  });
    } else {
        var tmpCurrentPlayer    = $("#new-player").contents().clone();
        $(tmpCurrentPlayer).find(".name-input").val(user.username).attr("readonly",true);
        $(tmpCurrentPlayer).find(".phone-input").val(user.phone).attr("readonly",true);
        $.confirm({
                      title      : 'Tiếp tục chơi',
                      content    : tmpCurrentPlayer,
                      columnClass: 'col-md-5 col-sm-12',
                      buttons    : {
                          formSubmit   : {
                              text    : 'Tiếp tục',
                              btnClass: 'btn-blue',
                              action  : function () {
                                  redirectToGame();
                              }
                          },
                          somethingElse: {
                              text    : 'Người chơi mới',
                              btnClass: 'btn-green',
                              action  : function () {
                                  $.confirm({
                                                title  : 'Thông tin người chơi',
                                                content: tmpNewPlayer,
                                                buttons: {
                                                    formSubmit: {
                                                        text    : 'Chơi',
                                                        btnClass: 'btn-blue',
                                                        action  : function () {
                                                            let name = this.$content.find('.name-input').val();
                                                            let phone = this.$content.find('.phone-input').val();
                                                            if (!name) {
                                                                warning("Bạn chưa nhập họ tên");
                                                                return false;
                                                            }
                                                            if (!phone.match(/^[0-9]{10}$/g)) {
                                                                warning("Số điện thoại không đúng định dạng");
                                                                return false;
                                                            }
                                                            checkUser(name, phone);
                                                        }
                                                    },
                                                    cancel    : {
                                                        text    : 'Hủy',
                                                        btnClass: 'btn-red',
                                                        action  : function () {
                                                        }
                                                    },
                                                },
                                            });
                              }
                          },
                          cancel       : {
                              text    : 'Hủy',
                              btnClass: 'btn-red',
                              action  : function () {
                              }
                          },
                      },
                  });
    }
}

function getScoreboardToday() {
    $.dialog({
                 title         : 'Bảng điểm hôm nay',
                 // columnClass: "col-xl-10 col-sm-12",
                 boxWidth      : '80vw',
                 useBootstrap  : false,
                 content       : function () {
                     var self = this;
                     return $.ajax({
                                       // async: false, // remove when api is available
                                       url     : 'https://order.hoanghamobile.com/api/gamea51/scoreboard',
                                       dataType: 'json',
                                       method  : 'GET'
                                   }).done(function (response) {
                         let players = response.players;
                         let tbody = $("#tbody");
                         tbody.empty();
                         players.forEach((item, index) => {
                             let row = $("#tmp-table tbody").contents().clone();
                             $(row).find(".index").html(index + 1);
                             $(row).find(".name").html(item.name);
                             $(row).find(".phone").html(item.phone);
                             $(row).find(".score").html(item.score);
                             $(row).find(".time").html(item.date);
                             $(tbody).append($(row));
                         });
                         self.setContentAppend($("#score-board").html());
                     }).fail(function () {
                         console.log("Failed!")
                     }).always(function () {
                         console.log("Normal ajax call")
                     });
                 },
                 contentLoaded : function (data, status, xhr) {
                     // console.log(data)
                 },
                 onContentReady: function () {
                     this.$content.find(".table-score").dataTable(dataTableOption);
                 }
             });
}

function getScoreboardAllTime() {
    $.dialog({
                 boxWidth      : '80vw',
                 useBootstrap  : false,
                 title         : 'Bảng điểm cả tuần',
                 content       : function () {
                     var self = this;
                     return $.ajax({
                                       // async: false, // remove when api is available
                                       url     : 'https://order.hoanghamobile.com/api/gamea51/scoreboard?time=all',
                                       dataType: 'json',
                                       method  : 'GET'
                                   }).done(function (response) {
                         let players = response.players;
                         let tbody = $("#tbody");
                         tbody.empty();
                         players.forEach((item, index) => {
                             let row = $("#tmp-table tbody").contents().clone();
                             $(row).find(".index").html(index + 1);
                             $(row).find(".name").html(item.name);
                             $(row).find(".phone").html(item.phone);
                             $(row).find(".score").html(item.score);
                             $(row).find(".time").html(item.date);
                             tbody.append($(row));
                         });
                         self.setContentAppend($("#score-board").html());
                     }).fail(function () {
                         console.log("Failed!")
                     }).always(function () {
                         console.log("Normal ajax call")
                     });
                 },
                 contentLoaded : function (data, status, xhr) {
                     // console.log(data)
                 },
                 onContentReady: function () {
                     // console.log("Content ready!")
                     this.$content.find(".table-score").dataTable(dataTableOption);
                 }
             });
}

function checkUser(name, phone) {
    $.ajax({
               headers: {
                   // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               },
               url    : 'https://order.hoanghamobile.com/api/gamea51/user',
               type   : 'GET',
               data   : {
                   phone: phone
               },
               success: function success(data) {
                   if (data.success == true) {
                       if (data.user == null || (data.user != null && data.user.name == name)) {
                           let user = {};
                           user.username = name;
                           user.phone = phone;
                           user.date = getStartTime();
                           setStorage("user", user);
                           redirectToGame();
                       } else {
                           warning('Số điện thoại này đã đăng ký');
                       }
                   } else {
                       console.log('Error- ' + data.message);
                   }
               },
               error  : function error(xhr, ajaxOptions, thrownError) {
                   console.log('Error ' + xhr.status + ' | ' + thrownError);
               }
           });
}

function showHowToPlay() {
    $.confirm({
        title: 'Cách chơi',
        content: 'url:guide.html',
        type: 'red',
        animation: 'scale',
        closeAnimation: 'scale',
        backgroundDismiss: true,
        columnClass: 'col-md-12 col-lg-6 col-xs-12',
        buttons: {
            cancel: {
                text: 'OK',
                btnClass: 'btn-red'
            }
        }
    });
}

function showReward() {
    $.confirm({
        title: 'Cơ cấu giải thưởng',
        content: 'url:reward.html',
        type: 'red',
        animation: 'scale',
        closeAnimation: 'scale',
        backgroundDismiss: true,
        columnClass: 'col-md-12 col-lg-6 col-xs-12',
        buttons: {
            cancel: {
                text: 'OK',
                btnClass: 'btn-red'
            }
        }
    });
}