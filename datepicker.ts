class DatePicker {
    private inputElement: HTMLElement;
    
    constructor(element: HTMLElement){
        this.inputElement = element;
        this.Build();
    }
    private Build(): void {
        alert("build");
    }
}