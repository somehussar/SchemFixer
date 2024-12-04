import jsonData from '../assets/lookuptable.json'
import * as NBT from "nbtify";
import {ByteTag} from "nbtify/dist/tag"
import LegacySchematic, { ILegacySchem as ILegacySchem } from './LegacySchematic';

function moveSize(original : Readonly<NBT.NBTData>, newSchem: ILegacySchem) {
  throw new Error("Moving size data");
}

function moveOffset(original : Readonly<NBT.NBTData>, newSchem: ILegacySchem) {

}

function moveOrigin(original : Readonly<NBT.NBTData>, newSchem: ILegacySchem) {

}

function moveTileEntities(original : Readonly<NBT.NBTData>, newSchem: ILegacySchem) {

}

function movePallete(original : Readonly<NBT.NBTData>, newSchem: ILegacySchem) {

}


export default class SchemParser {
    private error: string | null = null;
    private files: FileList;

    private outputBuffer: Uint8Array;
    private name: string = "";

    constructor(files: FileList) {
        this.files = files;
        this.outputBuffer = new Uint8Array();
    }

    getError(): string | null {
      return this.error;
    }
    hasError(): boolean {
      return this.error != null;
    }
    async tryConvertingSchemToSchematica() {
      try{
        const file = this.files.item(0);
        if (file == null) {
          return;
        }

        let name: string = file.name;
        let lastIndex: number = name.lastIndexOf(".");
        if(lastIndex != -1) {
          this.name = name.substring(0, lastIndex) + "_converted.schematic";
        } else {
          this.name = name + "_converted.schematic";  
        }

        const buff: ArrayBuffer = await file.arrayBuffer();

        const originalSchem: Readonly<NBT.NBTData> = Object.freeze(await NBT.read(buff));

        const legacySchematic: ILegacySchem = new LegacySchematic();

        moveSize(originalSchem, legacySchematic);
        moveOffset(originalSchem, legacySchematic);
        moveOrigin(originalSchem, legacySchematic);
        movePallete(originalSchem, legacySchematic);
        moveTileEntities(originalSchem, legacySchematic);

        this.outputBuffer = await NBT.compress(await NBT.write(legacySchematic, {rootName:"Schematic"}), 'gzip');

      
        
      } catch(error) {
        console.log(error);
        this.error = "Error parsing files - " + (error + "").split(":")[1].substring(1);
      }
    }

    getCompressedBlob(): Uint8Array {
      return this.outputBuffer;
    }

    getName(): string {
      return this.name;
    }

}