// Simple datepicker
// Author: Artem Grinn, grinn.art@gmail.com
var DatePicker = (function () {
    function DatePicker(element) {
        this.days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.inputElement = element;
        this.now = new Date();
        this.month = this.now.getMonth();
        this.year = this.now.getFullYear();
        this.today = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
        this.container = document.createElement("div");
        this.container.classList.add("datepicker");
        this.container.classList.add("hide");
        this.inputElement.parentNode.insertBefore(this.container, this.inputElement.nextSibling);
        this.Build();
        this.InputEventHandler();
        this.CalendarClickEventHandler();
        this.OutsideClickEventHandler();
    }
    DatePicker.prototype.Close = function () {
        if (!this.container.classList.contains("hide"))
            this.container.classList.add("hide");
    };
    DatePicker.prototype.Build = function () {
        var d = new Date(this.year, this.month);
        this.month = d.getMonth();
        this.year = d.getFullYear();

        // заголовок календаря
        var table = '<table>' + '<caption><button class="prev"><-</button> <span>' + this.months[this.month] + ' ' + this.year + '</span> <button class="next">-></button> </caption>';
        +'<tr>';

        [].forEach.call(this.days, function (day) {
            table += '<th>' + day + '</th>';
        });
        table += '</tr><tr>';

        for (var i = 0; i < this.GetDayNumber(d); i++) {
            table += '<td></td>';
        }

        while (d.getMonth() == this.month) {
            var tdClass = "";
            if (d.valueOf() < this.today.valueOf())
                tdClass = "class='unavailable'";
            if (d.valueOf() == this.today.valueOf())
                tdClass = "class='today'";
            table += '<td ' + tdClass + '>' + d.getDate() + '</td>';

            if (this.GetDayNumber(d) % 7 == 6) {
                table += '</tr><tr>';
            }

            d.setDate(d.getDate() + 1);
        }

        // пустыe ячейки
        if (this.GetDayNumber(d) != 0) {
            for (var i = this.GetDayNumber(d); i < 7; i++) {
                table += '<td></td>';
            }
        }

        table += '</tr></table>';
        this.container.innerHTML = table;
    };

    DatePicker.prototype.GetDayNumber = function (date) {
        var dayNumber = date.getDay();
        if (dayNumber == 0)
            dayNumber = 7;
        return dayNumber - 1;
    };

    DatePicker.prototype.InputEventHandler = function () {
        var _this = this;
        this.inputElement.addEventListener("click", function (e) {
            e.stopPropagation();
            var top = _this.inputElement.offsetTop;
            var left = _this.inputElement.offsetLeft;
            var height = _this.inputElement.offsetHeight;
            _this.container.style.top = (top + height) + "px";
            _this.container.style.left = left + "px";
            _this.container.classList.toggle("hide");
        });
    };

    DatePicker.prototype.CalendarClickEventHandler = function () {
        var _this = this;
        this.container.addEventListener("click", function (e) {
            e.stopPropagation();
            var target = (e.target || e.srcElement);
            if (target.tagName.toLowerCase() == "td" && parseInt(target.innerHTML)) {
                _this.inputElement.value = _this.GetFullDate(parseInt(target.innerHTML));
                _this.Close();
            }
            if (target.classList.contains("next")) {
                _this.month++;
                _this.Build();
            }
            if (target.classList.contains("prev")) {
                _this.month--;
                _this.Build();
            }
        });
    };

    DatePicker.prototype.OutsideClickEventHandler = function () {
        var _this = this;
        document.addEventListener("click", function () {
            _this.Close();
        });
    };

    DatePicker.prototype.GetFullDate = function (date) {
        return new Date(this.year, this.month, date).toDateString();
    };
    return DatePicker;
})();
