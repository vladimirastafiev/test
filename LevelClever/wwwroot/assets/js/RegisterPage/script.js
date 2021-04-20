function SwitchRole() {
    if ($('input[name=Role]:checked', '#RegisterForm').val() != null) {
        $('#RoleValidation').html('');
        Progress();
    }
    else $('#RoleValidation').html('Не вибрана роль');
}
var scrollRowForRegistrationSteps = null;
var scrollStep_px = 123;

if (window.screen.width > 1023) document.querySelector('.timeline-wrapperForMobileV').innerHTML = '';
else {
    /* For modile version */
    /* Automatic scroll registration steps */
    var scrollRowForRegistrationSteps = document.querySelector('.timeline-wrapperForMobileV .scrollRow');

    //alert(scrollStep_px)
}
/* Switching registration steps */
document.querySelectorAll('.StepProgress-item').forEach((step) => {
    step.onclick = function () {
        if (step.classList.contains('is-done') ||
            step.classList.contains('is-ready')) // если выбран текущий или пройденный шаг
            StepProgress_itemSelect(step.id.slice(-1)) // step id
    }
});

/*------------------------------------ */

StepProgress_itemSelect(1)

var step = 1;
var prev_step = 2;
function Progress() {

    if (!$('.block').find('.StepProgress-item').eq(step - 1).hasClass('is-ready')) {
        $('.block').find('.StepProgress-item.is-done').attr('class', 'StepProgress-item is-ready');
        $('.block').find('.bold.is-done').attr('class', 'bold is-ready');
    }
    step++;
    StepProgress_itemSelect(step);
}

function StepProgress_itemSelect(step = 0) {
    if (window.screen.width < 1023) { // scroll registration steps
        if ((step > prev_step) && (step > 2)) scrollRowForRegistrationSteps.scrollLeft += scrollStep_px;
        else if (step < 5) scrollRowForRegistrationSteps.scrollLeft -= scrollStep_px;
    }
    this.step = step;
    prev_step = step;
    $('.block').find('.StepProgress-item .bold.is-ready').css('font-weight', '500');
    if (!$('.block').find('.StepProgress-item').eq(step - 1).hasClass('is-ready')) {
        $('.block').find('.StepProgress-item').eq(step - 1).attr('class', 'StepProgress-item is-done');
        $('.block').find('.bold').eq(step - 1).attr('class', 'bold is-done');
    }
    else {
        $('.block').find('.StepProgress-item .bold.is-ready').eq(step - 1).css('font-weight', '700');
    }

    $('.block').find('.steps_frames').hide(); // hide all steps frames
    $('.block').find('#step' + step).show();
    //$('.block').find('#step' + step).css('display', 'flex');
}

/* Select role (radioButtons logics) */
document.querySelectorAll('.roles-blok').forEach((role) => {
    role.onclick = function () {
        role.lastElementChild.checked = true;
        document.querySelectorAll('.roles-blok .roles__img').forEach((r_img) => {
            r_img.classList.remove('active');
        });
        role.firstElementChild.classList.add('active');
        //alert(role.lastElementChild.value) // получить значение
    }
});




// /*блок 2: Первый элемент в select выделить другим цветом*/
// $('select').on('change', function(){
//     var $option = $(this);
//     if ($option.val() == 'birth') {
//         $option.css('color','red');
//     } else {
//         $option.css('color','black');
//     }
// }).change();

// /*Блок 3: Добавить фото на аватарку*/
$('#loadPhoto_input').on('change', function (ev) {
    if (ev.target.files[0]) {
        var fr = new FileReader();

        fr.addEventListener("load", function (ev2) {
            document.querySelector("label.loadPhotoIcon").style.background = "url(" + ev2.target.result + ")";
            document.querySelector("label.loadPhotoIcon").style.backgroundSize = "100% 100%";
        }, false);

        fr.readAsDataURL(ev.target.files[0]);
    }
});

// /*Блок 5: Ввести телефон*/
document.querySelectorAll('input.phone').forEach(function (item) {
    item.addEventListener('input', function () {
        fCurPosEnd(this);
    });
    item.addEventListener('click', function () {
        fCurPosEnd(this);
    });
    item.addEventListener('keyup', function () {
        fCurPosEnd(this);
    });
    fCurPosEnd(item);
});

function fCurPosEnd(el) {
    let sVal = el.value.replace(/\D+/gi, '').slice(3);
    sVal = sVal + '__________'.slice(sVal.length);
    let sNumb = sVal.match(/(.{2})(.{3})(.{2})(.{2})/);
    el.value = '+380(' + sNumb[1] + ')' + '-' + sNumb[2] + '-' + sNumb[3] + '-' + sNumb[4];
    el.focus();
    el.selectionStart = el.selectionEnd = (el.value.search(/[)-]*_/gi) < 0) ?
        el.value.length :
        el.value.search(/[)-]*_/gi);
}