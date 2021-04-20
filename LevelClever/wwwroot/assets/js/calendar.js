var _year = 2021;
var _monthNumber = 2;

var tbody_table = document.querySelector('.calendar-field table tbody');
var months = new Array();
months.push("Січень");
months.push("Лютий");
months.push("Березень");
months.push("Квітень");
months.push("Травень");
months.push("Червень");
months.push("Липень");
months.push("Серпень");
months.push("Вересень");
months.push("Жовтень");
months.push("Листопад");
months.push("Грудень");

var dayNote_div = null;
var notes_count_div = null;

function ViewDaysNotes(pupilNotesDays_dict, classroomTeacherNotesDays_dict) {
    var numDays_divs = document.querySelectorAll('.calendar-field td div.dayNote-cntnr-in-calendar');
    var numDay = 0;
    var dateNow = new Date();
    
    numDays_divs.forEach((day) => {
        numDay = day.nextElementSibling.nextElementSibling.textContent;
        if ((dateNow.getFullYear() == _year) && (dateNow.getMonth() == _monthNumber-1) && (dateNow.getDate() == numDay)) { // "подсветить" текущее число
            day.style.backgroundColor = "rgba(25,35,145,1)";
            day.nextElementSibling.nextElementSibling.style.color = "white";
        }
        if (typeof classroomTeacherNotesDays_dict[numDay] !== "undefined") { // если число в календаре, совпадает с числом заметки для "учеников" 
            day.style.background = "rgba(222,63,60,0.1)";
            day.nextElementSibling.style.background = "rgba(222,63,60,1)";
            day.nextElementSibling.textContent = classroomTeacherNotesDays_dict[numDay];
        }
        if (typeof pupilNotesDays_dict[numDay] !== "undefined") { // если число в календаре, совпадает с числом заметки для "клас. рук." 
            day.style.background = "rgba(25,35,145,0.1)";
            day.nextElementSibling.style.background = "rgba(25,35,145,1)";
            day.nextElementSibling.textContent = pupilNotesDays_dict[numDay];
        }
    })
}

GenerateCalendar(_year, _monthNumber);

function GenerateCalendar(year, monthNumber) {
    _year = year;
    _monthNumber = monthNumber;

    dayNote_div = document.createElement('div'); // блок, которые показывает, наличие заметки(-ок) для календ. дня
    dayNote_div.className = "dayNote-cntnr-in-calendar";
    notes_count_div = document.createElement('div'); // количество заметок для календ. дня
    notes_count_div.className = "notes-count";

    tbody_table.innerHTML = '';
    document.querySelector('.year_calendar').innerHTML = year;
    document.querySelector('.month_calendar').innerHTML = months[monthNumber-1];

    var tr = document.createElement('tr');
    var td = document.createElement('td');

    var currentMonth = new Date(year, monthNumber, 0);
    var countDaysInCurrentMonth = currentMonth.getDate();
    
    for (var i = 1; i <= countDaysInCurrentMonth; i++) {
        currentMonth.setDate(i);

        // Заполнение ПЕРВОЙ строки числами предыдущего месяца (если необходимо)
        if (i == 1) { /* Если текущее число месяца - "1" (в итерации) и Если "1" число текущего месяца НЕ понедельник */
            
            var backMonth = new Date(year, monthNumber, 0);
            backMonth.setDate(currentMonth.getDate()); 

            var td_arr = new Array(); // содержит дни последнего месяца до "1" числа текущего месяца
            while (backMonth.getDay() != 1) { // пока "Пн" не будет заполнен числом предыдущего месяца
                backMonth.setDate(backMonth.getDate() - 1) // обратный отсчет чисел от "1" числа текущего месяца
                td_arr.push(backMonth.getDate());
            }
            
            td_arr.reverse();
            td_arr.forEach(numDay => {
                tr.innerHTML += '<td><div class=\"numDay\">' + numDay + '</div></td>'; // заполнение части первой строки календаря числами
            });
        
        }

        //console.log(currentMonth.getDay())
        // Заполнение календаря числами текущего месяца
        if (currentMonth.getDay() != 0) {
            
            td.innerHTML = (dayNote_div.outerHTML) // add 'div.dayNote-cntnr-in-calendar'
            td.appendChild(notes_count_div);
            td.innerHTML += '<div class=\"numDay\">' + currentMonth.getDate() + '</div>'; // '<td>' + currentMonth.getDate() + '</td>';
            tr.innerHTML += td.outerHTML;

            if (currentMonth.getDate() == countDaysInCurrentMonth) { /* Если строка уже была заполнен числом месяца, что соответствует последнему число текущего месяца (конец цикла) */
               
                while (currentMonth.getDay() != 0) { // Заполнение ПОСЛЕДНЕЙ строки числами cледующего месяца (если необходимо)
                    currentMonth.setDate(currentMonth.getDate() + 1)
                    tr.innerHTML += '<td><div class=\"numDay\">' + currentMonth.getDate() + '</div></td>';
                }

                tbody_table.innerHTML += tr.outerHTML;
                tr.innerHTML = '';

                // while (tbody_table.outerHTML.match(/<tr>/g).length < 5) {
                //     currentMonth.setDate(currentMonth.getDate() + 1)
                //     tr.innerHTML = '';
                //     while (true) {
                //         console.log(currentMonth.getDay());
                //         tr.innerHTML += '<td>' + currentMonth.getDate() + '</td>';
                //         if (currentMonth.getDay() == 0) break; // если конец недели - "Вс" уже заполнено числом
                //         currentMonth.setDate(currentMonth.getDate() + 1)
                //     }
                //     tbody_table.innerHTML += tr.outerHTML;
                // }
            }
           
        }
        else {
            td.innerHTML = (dayNote_div.outerHTML) // add 'div.dayNote-cntnr-in-calendar'
            td.appendChild(notes_count_div);
            td.innerHTML += '<div class=\"numDay\">' + currentMonth.getDate() + '</div>'; // '<td>' + currentMonth.getDate() + '</td>';
            tr.innerHTML += td.outerHTML;
        
            tbody_table.innerHTML += tr.outerHTML;
            tr.innerHTML = '';
        }

    }
    /* Временный код - "Подсветка чисел календаря, для которых, якобы есть заметки" */
    var pupilNotesDays_dict = {
        '1' : '3',
        '3' : '1',
        '7' : '6',
        '15' : '4',
        '24' : '4',
    }
    var classroomTeacherNotesDays_dict = {
        '8' : '1'
    }
    ViewDaysNotes(pupilNotesDays_dict, classroomTeacherNotesDays_dict);
   
}   


/* Логика, когда было совершенно нажатие на "Месяц" или "Год" */
var monthClicked = false;
var yearClicked = false;

var selectMonthOrYearField = document.querySelector('.select-month-or-year');
var overlapBlock = document.querySelector("#overlap-block")

function MonthOrYearSelectView () {
    var m_or_y_tbody = document.querySelector('.months-or-year-list tbody');
    var html = "";
    m_or_y_tbody.innerHTML = '';

    if (monthClicked == true) {
        for (var j = 0, i = 0; j < months.length; j++) {
            if (i == 0) html += "<tr>";
            else if (i == 4) {
                i = 0;
                html += "</tr>";
            }
            html += "<td>" + months[j] + "</td>";
            i++;
        }
    }
    else if (yearClicked == true) {
        var defYear = 2017; 
        for (var j = 0, i = 0; j < 12; j++) {
            if (i == 0) html += "<tr>";
            else if (i == 4) {
                i = 0;
                html += "</tr>";
            }
            html += "<td>" + (++defYear) + "</td>";
            i++;
        }
    }
    
    m_or_y_tbody.innerHTML = html;
    
    selectMonthOrYearField.style.visibility = 'visible';
    overlapBlock.style.transition = "transform .5s"; 
    overlapBlock.style.transform = "scale(0)"; 

    document.querySelectorAll('.months-or-year-list td').forEach((selectCell)=> {
        selectCell.onclick = () => {
            overlapBlock.style.transition = "transform 0s"; 
            overlapBlock.style.transform = "scale(1)"; 
            selectMonthOrYearField.style.visibility = 'hidden';
            if (monthClicked == true) GenerateCalendar(_year, (months.indexOf(selectCell.textContent) + 1));
            if (yearClicked == true) GenerateCalendar(selectCell.textContent, _monthNumber);
        }
    })
}

document.querySelector('.month_calendar').onclick = () => {
    monthClicked = true;
    yearClicked = false;
    MonthOrYearSelectView();
}
   
document.querySelector('.year_calendar').onclick = () => {
    yearClicked = true;
    monthClicked = false;
    MonthOrYearSelectView();
}
   


/* Логика, когда было совершенно нажатие на "Год" */


document.querySelector('.back-month-arrow_btn').onclick = () => { // Переход к ПРЕДЫДУЩЕМУ месяцу
    if (_monthNumber > 1) _monthNumber -= 1;
    else if (_monthNumber == 1) {
        _year -= 1;
        _monthNumber = 12;
    }
    GenerateCalendar(_year, _monthNumber);
}

document.querySelector('.next-month-arrow_btn').onclick = () => { // Переход к СЛЕДУЮЩЕМУ месяцу
    if (_monthNumber < 12) _monthNumber += 1;
    else if (_monthNumber == 12) {
        _year += 1;
        _monthNumber = 1;
    }
    GenerateCalendar(_year, _monthNumber);
}

