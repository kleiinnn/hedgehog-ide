import IProgramStorage from "./ProgramStorage";

export default class Blob {
    public id: string;
    public size: number;

    private programName: string;
    private storage: IProgramStorage;

    public constructor(storage, programName, id, size) {
        this.storage = storage;
        this.programName = programName;
        this.id = id;
        this.size = size;
    }

    public readContent(): string {
        return undefined;
    }
}
