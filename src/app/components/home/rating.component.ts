import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kendo-rating',
    template: `
        <span *ngFor="let item of stars" class="ratingIcon(item)"></span>
    `,
    styles: [`
        .yellow {
            color: #ffa600;
        }
    `]
})
export class RatingComponent implements OnInit {
    @Input() public value!: number;
    @Input() public max!: number;

    public stars!: number[];

    public ngOnInit(): void {
        this.stars = new Array(this.max).fill(1).map((item, index) => item + index);
    }

    public ratingIcon(item: number): string {
        return (item <= this.value) ? 'k-icon k-i-star yellow' : 'k-icon k-i-star-outline';
    }
}
