import { ByteArrayTag, CompoundTag, Int16, Int32, IntArrayTag, IntTag, ListTag, RootTag, ShortTag } from "nbtify";

export type BlockDataTag = CompoundTag & {
    BlockEntities: ListTag<CompoundTag>;
    Data: ByteArrayTag;
    Pallete: CompoundTag;
}

export type SchematicMetadata = CompoundTag & {
    WEOffsetX: IntTag | null;
    WEOffsetY: IntTag | null;
    WEOffsetZ: IntTag | null;
}

export type IModernRoot = RootTag & {
    Schematic: IModernSchem;
}

export type IModernSchem = CompoundTag & {
    Blocks: BlockDataTag;
    DataVersion: IntTag;
    Width: ShortTag;
    Height: ShortTag;
    Length: ShortTag;
    Offset: IntArrayTag;
    Metadata: CompoundTag;
}

export interface ILegacySchem {
    Blocks: ByteArrayTag;
    Data: ByteArrayTag;
    DataVersion: IntTag;
    Width: ShortTag;
    Height: ShortTag; 
    Length: ShortTag;
    Materials: string;
    Pallete: CompoundTag;
    PalleteMax: IntTag;
    TileEntities: [];
    Version: IntTag;
    WEOffsetX: IntTag;
    WEOffsetY: IntTag;
    WEOffsetZ: IntTag;
    WEOriginX: IntTag;
    WEOriginY: IntTag;
    WEOriginZ: IntTag;
    
};

export default class LegacySchematic implements ILegacySchem {
    public Blocks: ByteArrayTag = new Uint8Array();
    public Data: ByteArrayTag = new Uint8Array();
    public DataVersion: IntTag = new Int32(0);
    public Width: ShortTag = new Int16(0);
    public Height: ShortTag = new Int16(0); 
    public Length: ShortTag = new Int16(0);
    public Materials: string = "Alpha";
    public Pallete: CompoundTag = {};
    public PalleteMax: IntTag = new Int32(0);
    public TileEntities: [] = [];
    public Version: IntTag = new Int32(0);
    public WEOffsetX: IntTag = new Int32(0);
    public WEOffsetY: IntTag = new Int32(0);
    public WEOffsetZ: IntTag = new Int32(0);
    public WEOriginX: IntTag = new Int32(0);
    public WEOriginY: IntTag = new Int32(0);
    public WEOriginZ: IntTag = new Int32(0);

    constructor(modern: IModernSchem) {
        this.Width = modern.Width;
        this.Height = modern.Height;
        this.Length = modern.Length;

        this.WEOffsetX = new Int32(modern.Offset[0]);
        this.WEOffsetY = new Int32(modern.Offset[1]);
        this.WEOffsetZ = new Int32(modern.Offset[2]);
        // @TODO: Add metadata conversion.

        

    }
    
}