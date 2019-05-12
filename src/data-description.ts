import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export default class DataDescription {
  doc: any;
  baseFilePath: string = '/';

  constructor(doc?: any) {
    this.doc = doc;
  }

  static load(filePath: string) {
    const ext = filePath.split('.').pop();

    const ins = new DataDescription();
    switch (ext) {
      case 'yaml':
      case 'yml':
        ins.doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf-8'));
        break;
      case 'json':
        ins.doc = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        break;
      default:
        throw new Error('Unknown extension');
    }

    ins.baseFilePath = filePath;
    return ins;
  }

  saveAs(filePath: string, indent = 2) {
    if (this.doc == null) {
      throw new Error('No document to save');
    }
    const ext = filePath.split('.').pop();

    let docStr = null;
    switch (ext) {
      case 'yaml':
      case 'yml':
        docStr = yaml.safeDump(this.doc, { indent });
        break;
      case 'json':
        docStr = JSON.stringify(this.doc, null, ' '.repeat(indent));
        break;
      default:
        throw new Error('Unknown extension');
    }
    fs.writeFileSync(filePath, docStr, 'utf-8');
  }

  getReference(ref: string): {} {
    // './remote-ref.yml#/local/ref'
    const [remoteRef, localRef] = ref.split('#');

    // return the parsed oject if only local reference
    if (!remoteRef) {
      return this.getLocalObject(localRef);
    }

    // load another document
    const filePath = path.resolve(path.dirname(this.baseFilePath), remoteRef);
    const dsc = DataDescription.load(filePath);
    // return the parsed object of the loaded document.
    return dsc.getReference('#' + localRef);
  }

  private getLocalObject(ref: string) {
    const pathKeys = parseLocalRef(ref);

    let obj = this.doc;
    pathKeys.forEach(x => {
      obj = obj[x];
    });
    return obj;
  }
}

const parseLocalRef = (ref: string) =>
  ref
    .split('/')
    .filter(x => x !== '')
    .map(x => x.replace(/~1/g, '/').replace(/~0/g, '~'));