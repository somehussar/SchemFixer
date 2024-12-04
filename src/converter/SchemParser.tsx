import jsonData from '../assets/lookuptable.json'
import * as NBT from "nbtify";
import {ByteTag} from "nbtify/dist/tag"
import LegacySchematic, { ILegacySchem as ILegacySchem } from './LegacySchematic';

function moveSize(original : Readonly<NBT.NBTData>, newSchem: ILegacySchem) {

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

    private outputBuffer: ArrayBuffer | null = null;

    constructor(files: FileList) {
        this.files = files;
    }

    getError(): string | null {
      return this.error;
    }
    hasError(): boolean {
      return this.error == null;
    }
    async tryConvertingSchemToSchematica() {
      try{
        console.log('a');
        const file = this.files.item(0);
        if (file == null) {
          return;
        }

        const buff: ArrayBuffer = await file.arrayBuffer();

        const originalSchem: Readonly<NBT.NBTData> = Object.freeze(await NBT.read(buff));

        const legacySchematic: ILegacySchem = new LegacySchematic();


        this.outputBuffer = (await NBT.write(legacySchematic, {rootName:"Schematic", compression:"gzip"}));

      
        
      } catch(error) {
        console.log(error);
        this.error = "Error parsing files";
      }
    }
    async tryCompressingFiles() {
      try{

      } catch(error) {
        this.error = "Error compressing NBT";
      }
    }

    getCompressedBlob(): ArrayBuffer {
      throw new Error("Method not implemented.");
    }

}