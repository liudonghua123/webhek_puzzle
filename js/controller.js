// Bindings go here


$(document).ready(function () {

    i18n = new I18n({
        directory: "locales",
        locale: (window.navigator.userLanguage || window.navigator.language || "en-us").toLowerCase(),
        extension: ".json"
    });

    $("#title").text(i18n.__("title"));
    $("#reset").text(i18n.__("reset"));
    $("#new").text(i18n.__("new"));
    $("#instruct").text(i18n.__("instruct"));

    $message_modal = $('#message-modal').modal({
        backdrop: true,
        show: false,
        keyboard: false
    });

    showMessage = function (header, body, btnSubmitText, callback) {
        $message_modal
            .find('.modal-header > h4').text(header).end()
            .find('.modal-body p').html(body).end();

        if (btnSubmitText) {
            $message_modal
                .find('.callback-btn').html(btnSubmitText).show().end()
                .find('.callback-btn')
                .off('click.callback')
                .on('click.callback', function () {
                    callback();
                    $message_modal.modal('hide');
                }).end();
        }
        else {
            $message_modal.find('.callback-btn').hide();
        }
        $message_modal.modal('show');
    };

    $('.reset').click(function () {
        showMessage(i18n.__("confirm"), i18n.__("reset_confirm_details"), i18n.__("reset"), function () {
            game.onResetLevelClick();
        });
    });

    $('.newgame').click(function () {
        showMessage(i18n.__("confirm"), i18n.__("new_confirm_details"), i18n.__("new"), function () {
            game.onNewGameClick();
        });
    });

    $('.instruct').click(function () {
        showMessage(i18n.__("instruct"), i18n.__("instruct_details"), null, null);
    });

    var game = new Game();
    game.beginGame();
});
