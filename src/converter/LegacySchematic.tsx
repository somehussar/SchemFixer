import { ByteArrayTag, CompoundTag, Int16, Int32, IntTag, ShortTag } from "nbtify";


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
    
}