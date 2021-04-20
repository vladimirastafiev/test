var backMonth = new Date(year, monthNumber - 1, 0);
var lastDWeekBackMonth = backMonth.getDate();
var num = lastDWeekBackMonth - currentMonth.getDay(); /* num - число предыдущего месяца когда был "Пн" */

var td_arr = new Array(); // содержит дни последнего месяца до "1" числа текущего месяца
while (true) { /* Заполнение ячеек табл. что стоят до "1" числа текущего месяца, числами предыдущего месяца */
    if (backMonth.getDay() == 1) break; /* Если "Пн", на первой строке, уже заполнен числом предыдущего месяца */
    backMonth.setDate(lastDWeekBackMonth);
    td_arr.push(backMonth.getDate());
    lastDWeekBackMonth -= 1; /* Перебор, в обратном порядке, чисел предыдущего месяца  */
}
td_arr.reverse();
td_arr.forEach(numDay => {
    tr.innerHTML += '<td>' + numDay + '</td>'; 
});