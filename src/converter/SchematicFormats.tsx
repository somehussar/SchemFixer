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
    WorldEdit: WEMeta | null;
}

export type WEMeta = CompoundTag & { 
    Origin: Int32Array;
}

export type ITileEntity = CompoundTag & {
    x: IntTag | null;
    y: IntTag | null;
    z: IntTag | null;
    id: any;

    Pos?: IntArrayTag | null;
    Id?: IntTag | null;
}

export type IModernSchem = CompoundTag & {
    BlockData: BlockDataTag;
    BlockEntities: Array<ITileEntity> | null;
    DataVersion: IntTag;
    Width: ShortTag;
    Height: ShortTag;
    Length: ShortTag;
    Offset: IntArrayTag;
    Metadata: SchematicMetadata;
    Pallete: CompoundTag;
    PalleteMax: IntTag;
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
    TileEntities: Array<ITileEntity>;
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
    public TileEntities = new Array<ITileEntity>;
    public Version: IntTag = new Int32(0);
    public WEOffsetX: IntTag = new Int32(0);
    public WEOffsetY: IntTag = new Int32(0);
    public WEOffsetZ: IntTag = new Int32(0);
    public WEOriginX: IntTag = new Int32(0);
    public WEOriginY: IntTag = new Int32(0);
    public WEOriginZ: IntTag = new Int32(0);

    constructor(root: IModernSchem) {
        const modern = root;
        this.Width = modern.Width;
        this.Height = modern.Height;
        this.Length = modern.Length;


        // Copy offsets
        console.log("COPYING OFFSETS");
        this.WEOffsetX = new Int32(modern.Offset[0]);
        this.WEOffsetY = new Int32(modern.Offset[1]);
        this.WEOffsetZ = new Int32(modern.Offset[2]);
        if(root.Metadata != null && root.Metadata.WEOffsetX != null && root.Metadata.WEOffsetY != null && root.Metadata.WEOffsetZ != null) {
            this.WEOffsetX = root.Metadata.WEOffsetX;
            this.WEOffsetY = root.Metadata.WEOffsetY;
            this.WEOffsetZ = root.Metadata.WEOffsetZ;
        }


        // Copy origin
        console.log("COPYING ORIGIN");
        if (modern.Metadata != null && modern.Metadata.WorldEdit != null && modern.Metadata.WorldEdit.Origin != null) {
            this.WEOriginX = new Int32(modern.Metadata.WorldEdit.Origin[0]);
            this.WEOriginY = new Int32(modern.Metadata.WorldEdit.Origin[1]);
            this.WEOriginZ = new Int32(modern.Metadata.WorldEdit.Origin[2]);

            // if (root.WEOffsetX != null && root.WEOffsetY != null && root.WEOffsetZ != null) {
            //     this.WEOriginX = new Int32(root.WEOffsetX);

            // }

            if (this.WEOffsetX != null && this.WEOffsetY != null && this.WEOffsetZ != null) {
                this.WEOriginX = new Int32(this.WEOffsetX.valueOf() + this.WEOriginX.valueOf());
                this.WEOriginY = new Int32(this.WEOffsetY.valueOf() + this.WEOriginY.valueOf());
                this.WEOriginZ = new Int32(this.WEOffsetZ.valueOf() + this.WEOriginZ.valueOf());
                
            }
        }
        if (root.Offset != null) {
            this.WEOriginX = new Int32(root.Offset[0]);
            this.WEOriginY = new Int32(root.Offset[1]);
            this.WEOriginZ = new Int32(root.Offset[2]);
        }


        // Move tile entities.
        console.log("COPYING TILE ENTITIES")
        if(modern.BlockEntities != null) {
            this.TileEntities = modern.BlockEntities;
            
            for (let i = 0; i < this.TileEntities.length; i++) {
                let tileEntity = this.TileEntities[i];

                if(tileEntity.Pos != null) {
                    tileEntity.x = new Int32(tileEntity.Pos[0]);
                    tileEntity.y = new Int32(tileEntity.Pos[1]);
                    tileEntity.z = new Int32(tileEntity.Pos[2]);
                    
                    delete tileEntity.Pos;
                }

                if(tileEntity.Id != null) {
                    tileEntity.id = tileEntity.Id;

                    delete tileEntity.Id;
                }
            }
        }


    }
    
}