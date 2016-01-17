class DatePicker {
    private inputElement: HTMLInputElement;
    private container: HTMLElement;
    private now: Date;
    private month: number;
    private year: number;
    private today: Date;
    private days: Array<string> = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    private months: Array<string> = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        
    constructor(element: HTMLInputElement){
        this.inputElement = element;
        this.now = new Date();
        this.month = this.now.getMonth();
        this.year = this.now.getFullYear();
        this.today = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
        this.container = document.createElement("div");
        this.container.classList.add("datepicker");
        this.container.classList.add("hide");
        this.inputElement.parentNode.insertBefore(this.container, this.inputElement.nextSibling)
        this.Build();
        this.InputEventHandler();
        this.ChooseDateEventHandler();
        this.NextEventHandler();
        this.PrevEventHandler();
        this.OutsideClickEventHandler();
    }
    
    public Close(): void{
        if(!this.container.classList.contains("hide"))
            this.container.classList.add("hide");
    }
    private Build(): void {
       
        var d = new Date(this.year, this.month);
        this.month = d.getMonth();
        this.year = d.getFullYear();
       
        // заголовок календаря
        var table = '<table>'    
            + '<caption><button class="prev"><-</button> <span>' 
            + this.months[this.month] +' '+ this.year 
            + '</span> <button class="next">-></button> </caption>';
            + '<tr>';
            
        [].forEach.call(this.days, (day: string) => {
            table += '<th>' + day + '</th>';
        });
        table += '</tr>';
        
        for (var i = 0; i < this.GetDayNumber(d); i++) {
            table += '<td></td>';
        }

        // ячейки календаря с датами
        while (d.getMonth() == this.month) {
            var tdClass = "";
            if(d.valueOf() <  this.today.valueOf()) tdClass = "class='unavailable'";
            if(d.valueOf() ==  this.today.valueOf()) tdClass = "class='today'";
            table += '<td '+ tdClass+'>' + d.getDate() + '</td>';
            
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
    }   
    
    private GetDayNumber(date: Date): number {
        var dayNumber = date.getDay();
        if (dayNumber == 0) dayNumber = 7;
        return dayNumber - 1
    }
    
    private InputEventHandler(): void {
        this.inputElement.addEventListener("click", (e: Event)=>{
            e.stopPropagation();
            this.container.classList.toggle("hide");
        });
    }
    
    private ChooseDateEventHandler(): void {
        this.container.addEventListener("click", (e: Event)=>{
            e.stopPropagation();
            var target = <HTMLElement>(e.target || e.srcElement);
            if(target.tagName.toLowerCase() == "td" && parseInt(target.innerHTML)){
                this.inputElement.value = this.GetFullDate(parseInt(target.innerHTML));
                this.Close();
            }            
        });
    }
    
    private NextEventHandler(): void {
        this.container.addEventListener("click", (e: Event)=>{
            e.stopPropagation();
            var target = <HTMLElement>(e.target || e.srcElement);
            if(target.classList.contains("next")){
                this.month++;   
                this.Build();  
            }          
        });
    }
    
    private PrevEventHandler(): void {
        this.container.addEventListener("click", (e: Event)=>{
            e.stopPropagation();
            var target = <HTMLElement>(e.target || e.srcElement);
            if(target.classList.contains("prev")){
                this.month--;   
                this.Build()     
            }            
        });
    }
    
    private OutsideClickEventHandler(): void{
         document.addEventListener("click", ()=>{
            this.Close();
        });
    }
    
    private GetFullDate(date: number): string{
        return new Date(this.year, this.month, date).toDateString();
    }
}