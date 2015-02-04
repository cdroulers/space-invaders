class Size {
    constructor(public width: number, public height: number) {
    }

    public resize(ratio: number): Size {
        return new Size(this.width * ratio, this.height * ratio);
    }
}

export = Size; 