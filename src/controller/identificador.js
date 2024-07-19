import { Defuncion } from "../models/defuncion.model.js";
import { Data } from "../models/delete.model.js";
import { Divorcio } from "../models/divorcio.model.js";
import { Matrimonio } from "../models/matrimonios.model.js";
import { Nacimiento } from "../models/nacimiento.model.js";
import { Otro } from "../models/otro.model.js";
import { Reconocimiento } from "../models/reconocimiento.model.js";

export const Identificador = async (req, res) => {
    try {
        const data = await Data.findAll();
        let contador = 0;
        await new Promise((resolve) => setTimeout(resolve, 3000));
        for (const record of data) {
            const datosJson = record.dataValues.datos_json;
            if (
                datosJson &&
                datosJson.nacimientos &&
                datosJson.nacimientos.length > 0
            ) {
                Acta_Nacimiento(datosJson, record.dataValues.id, contador);
            }
            if (
                datosJson &&
                datosJson.matrimonios &&
                datosJson.matrimonios.length > 0
            ) {
                Acta_Matrimonio(datosJson, record.dataValues.id, contador);
            }
            if (
                datosJson &&
                datosJson.defunciones &&
                datosJson.defunciones.length > 0
            ) {
                Acta_Defuncion(datosJson, record.dataValues.id, contador);
            }
            contador++;
        }
        res.status(200).json({ message: "Datos procesados correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener datos" });
    }
};

const Acta_Nacimiento = async (datosJson, iden, contador, req, res) => {
    try {
        let agregado;
        const skippedRecords = [];

        for (const nacimiento of datosJson.nacimientos) {
            try {
                const newActa = {
                    identificador: iden,
                    ssa: nacimiento.ssa,
                    curp: nacimiento.curp,
                    foja: nacimiento.foja,
                    pais: nacimiento.pais,
                    sexo: nacimiento.sexo,
                    tomo: nacimiento.tomo,
                    folio: nacimiento.folio,
                    libro: nacimiento.libro,
                    madre: nacimiento.madre,
                    padre: nacimiento.padre,
                    sello: nacimiento.sello,
                    cadena: nacimiento.cadena,
                    noActa: nacimiento.noActa,
                    nombre: nacimiento.nombre,
                    actaBis: nacimiento.actaBis,
                    paisTxt: nacimiento.paisTxt,
                    curpAux1: nacimiento.curpAux1,
                    curpAux2: nacimiento.curpAux2,
                    nacMADRE: nacimiento.nacMADRE,
                    nacPADRE: nacimiento.nacPADRE,
                    curpMADRE: nacimiento.curpMADRE,
                    curpPADRE: nacimiento.curpPADRE,
                    estadoNac: nacimiento.estadoNac,
                    estadoReg: nacimiento.estadoReg,
                    localidad: nacimiento.localidad,
                    municipio: nacimiento.municipio,
                    oficialia: nacimiento.oficialia,
                    numeroActa: nacimiento.numeroActa,
                    valorMovim: nacimiento.valorMovim,
                    vivoMuerto: nacimiento.vivoMuerto,
                    codigoCivil: nacimiento.codigoCivil,
                    identElectr: nacimiento.identElectr,
                    nacMadreTxt: nacimiento.nacMadreTxt,
                    nacPadreTxt: nacimiento.nacPadreTxt,
                    tipoPersona: nacimiento.tipoPersona,
                    anioRegistro: nacimiento.anioRegistro,
                    municipioNac: nacimiento.municipioNac,
                    municipioReg: nacimiento.municipioReg,
                    nacionalidad: nacimiento.nacionalidad,
                    fechaRegistro: nacimiento.fechaRegistro,
                    transcripcion: nacimiento.transcripcion,
                    primerApellido: nacimiento.primerApellido,
                    estadoNacNombre: nacimiento.estadoNacNombre,
                    estadoRegNombre: nacimiento.estadoRegNombre,
                    fechaNacimiento: nacimiento.fechaNacimiento,
                    municipioNombre: nacimiento.municipioNombre,
                    nacionalidadTxt: nacimiento.nacionalidadTxt,
                    notasMarginales: nacimiento.notasMarginales,
                    oficialiaNombre: nacimiento.oficialiaNombre,
                    segundoApellido: nacimiento.segundoApellido,
                    nacionalidadAux1: nacimiento.nacionalidadAux1,
                    nacionalidadAux2: nacimiento.nacionalidadAux2,
                    estadoRegNacNombre: nacimiento.estadoRegNacNombre,
                    municipioNacNombre: nacimiento.municipioNacNombre,
                    municipioRegNombre: nacimiento.municipioRegNombre,
                    nacionalidadAux1Txt: nacimiento.nacionalidadAux1Txt,
                    nacionalidadAux2Txt: nacimiento.nacionalidadAux2Txt,
                    nombrePrimeraPersona: nacimiento.nombrePrimeraPersona,
                    nombreSegundaPersona: nacimiento.nombreSegundaPersona,
                    primerApellidoPrimeraPersona:
                        nacimiento.primerApellidoPrimeraPersona,
                    primerApellidoSegundaPersona:
                        nacimiento.primerApellidoSegundaPersona,
                    segundoApellidoPrimeraPersona:
                        nacimiento.segundoApellidoPrimeraPersona,
                    segundoApellidoSegundaPersona:
                        nacimiento.segundoApellidoSegundaPersona,
                };
                if (contador === 5000)
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                agregado = await Nacimiento.create(newActa);
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    skippedRecords.push(nacimiento.identificador_electronico);
                    console.log(
                        `Registro con id ${nacimiento.identificador_electronico} ya existe, omitiendo...`,
                    );
                } else {
                    throw error; // Propaga cualquier otro error que no sea de clave única
                }
            }
        }
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            skippedRecords.push(nacimiento.identificador_electronico);
            console.log(
                `Registro con id ${nacimiento.identificador_electronico} ya existe, omitiendo...`,
            );
        } else {
            throw error; // Propaga cualquier otro error que no sea de clave única
        }
    }
};

const Acta_Matrimonio = async (datosJson, iden, contador, req, res) => {
    try {
        const skippedRecords = [];
        for (const matrimonio of datosJson.matrimonios) {
            try {
                const newActa = {
                    identificador: iden,
                    IND_CURP_EL: matrimonio.IND_CURP_EL,
                    IND_CURP_ELLA: matrimonio.IND_CURP_ELLA,
                    MAT_CRIP_EL: matrimonio.MAT_CRIP_EL,
                    MAT_CRIP_ELLA: matrimonio.MAT_CRIP_ELLA,
                    MAT_REGIMEN_PATRIMONIAL: matrimonio.MAT_REGIMEN_PATRIMONIAL,
                    MAT_ERROR_ORIGEN: matrimonio.MAT_ERROR_ORIGEN,
                    MAT_ARCHIVO_ORIGEN: matrimonio.MAT_ARCHIVO_ORIGEN,
                    IMA_NOMBRE_HOMOLOGADO: matrimonio.IMA_NOMBRE_HOMOLOGADO,
                    MAT_DOC_EXTRANJERO: matrimonio.MAT_DOC_EXTRANJERO,
                    MAT_NOM_DEL_CTY: matrimonio.MAT_NOM_DEL_CTY,
                    MAT_PRIMER_AP_DEL_CTY: matrimonio.MAT_PRIMER_AP_DEL_CTY,
                    MAT_SEGUNDO_AP_DEL_CTY: matrimonio.MAT_SEGUNDO_AP_DEL_CTY,
                    MAT_FECHA_NAC_DEL_CTY: matrimonio.MAT_FECHA_NAC_DEL_CTY,
                    MAT_SEXO_DEL_CTY: matrimonio.MAT_SEXO_DEL_CTY,
                    MAT_EDAD_DEL_CTY: matrimonio.MAT_EDAD_DEL_CTY,
                    PAI_NACIONALIDAD_DEL_CTY:
                        matrimonio.PAI_NACIONALIDAD_DEL_CTY,
                    PAI_NACIONALIDAD_DEL_CTY_DESC:
                        matrimonio.PAI_NACIONALIDAD_DEL_CTY_DESC,
                    PAI_PAIS_NACI_DEL_CTY: matrimonio.PAI_PAIS_NACI_DEL_CTY,
                    PAI_PAIS_NACI_DEL_CTY_DESC:
                        matrimonio.PAI_PAIS_NACI_DEL_CTY_DESC,
                    ENT_COD_NAC_DEL_CTY: matrimonio.ENT_COD_NAC_DEL_CTY,
                    ENT_COD_NAC_DEL_CTY_DESC:
                        matrimonio.ENT_COD_NAC_DEL_CTY_DESC,
                    MUN_COD_NAC_DEL_CTY: matrimonio.MUN_COD_NAC_DEL_CTY,
                    MUN_COD_NAC_DEL_CTY_DESC:
                        matrimonio.MUN_COD_NAC_DEL_CTY_DESC,
                    MAT_LOC_NAC_DEL_CTY: matrimonio.MAT_LOC_NAC_DEL_CTY,
                    MAT_NOM_DELA_CTY: matrimonio.MAT_NOM_DELA_CTY,
                    MAT_PRIMER_AP_DELA_CTY: matrimonio.MAT_PRIMER_AP_DELA_CTY,
                    MAT_SEGUNDO_AP_DELA_CTY: matrimonio.MAT_SEGUNDO_AP_DELA_CTY,
                    MAT_FECHA_NAC_DELA_CTY: matrimonio.MAT_FECHA_NAC_DELA_CTY,
                    MAT_SEXO_DELA_CTY: matrimonio.MAT_SEXO_DELA_CTY,
                    MAT_EDAD_DELA_CTY: matrimonio.MAT_EDAD_DELA_CTY,
                    PAI_NACIONALIDAD_DELA_CTY:
                        matrimonio.PAI_NACIONALIDAD_DELA_CTY,
                    PAI_NACIONALIDAD_DELA_CTY_DESC:
                        matrimonio.PAI_NACIONALIDAD_DELA_CTY_DESC,
                    PAI_PAIS_NACI_DELA_CTY: matrimonio.PAI_PAIS_NACI_DELA_CTY,
                    PAI_PAIS_NACI_DELA_CTY_DESC:
                        matrimonio.PAI_PAIS_NACI_DELA_CTY_DESC,
                    ENT_COD_NAC_DELA_CTY: matrimonio.ENT_COD_NAC_DELA_CTY,
                    ENT_COD_NAC_DELA_CTY_DESC:
                        matrimonio.ENT_COD_NAC_DELA_CTY_DESC,
                    MUN_COD_NAC_DELA_CTY: matrimonio.MUN_COD_NAC_DELA_CTY,
                    MUN_COD_NAC_DELA_CTY_DESC:
                        matrimonio.MUN_COD_NAC_DELA_CTY_DESC,
                    MAT_LOC_NAC_DELA_CTY: matrimonio.MAT_LOC_NAC_DELA_CTY,
                    MAT_NOM_PA_DEL_CTY: matrimonio.MAT_NOM_PA_DEL_CTY,
                    MAT_PRIMER_AP_PA_DEL_CTY:
                        matrimonio.MAT_PRIMER_AP_PA_DEL_CTY,
                    MAT_SEGUNDO_AP_PA_DEL_CTY:
                        matrimonio.MAT_SEGUNDO_AP_PA_DEL_CTY,
                    MAT_FECHA_NAC_PA_DEL_CTY:
                        matrimonio.MAT_FECHA_NAC_PA_DEL_CTY,
                    MAT_SEXO_PA_DEL_CTY: matrimonio.MAT_SEXO_PA_DEL_CTY,
                    MAT_EDAD_PA_DEL_CTY: matrimonio.MAT_EDAD_PA_DEL_CTY,
                    PAI_NACIONALIDAD_PA_DEL_CTY:
                        matrimonio.PAI_NACIONALIDAD_PA_DEL_CTY,
                    PAI_NACIONALIDAD_PA_DEL_CTY_DESC:
                        matrimonio.PAI_NACIONALIDAD_PA_DEL_CTY_DESC,
                    PAI_PAIS_NACI_PA_DEL_CTY:
                        matrimonio.PAI_PAIS_NACI_PA_DEL_CTY,
                    PAI_PAIS_NACI_PA_DEL_CTY_DESC:
                        matrimonio.PAI_PAIS_NACI_PA_DEL_CTY_DESC,
                    ENT_COD_NAC_PA_DEL_CTY: matrimonio.ENT_COD_NAC_PA_DEL_CTY,
                    MUN_COD_NAC_PA_DEL_CTY: matrimonio.MUN_COD_NAC_PA_DEL_CTY,
                    MAT_LOC_NAC_PA_DEL_CTY: matrimonio.MAT_LOC_NAC_PA_DEL_CTY,
                    MAT_NOM_MA_DEL_CTY: matrimonio.MAT_NOM_MA_DEL_CTY,
                    MAT_PRIMER_AP_MA_DEL_CTY:
                        matrimonio.MAT_PRIMER_AP_MA_DEL_CTY,
                    MAT_SEGUNDO_AP_MA_DEL_CTY:
                        matrimonio.MAT_SEGUNDO_AP_MA_DEL_CTY,
                    MAT_FECHA_NAC_MA_DEL_CTY:
                        matrimonio.MAT_FECHA_NAC_MA_DEL_CTY,
                    MAT_SEXO_MA_DEL_CTY: matrimonio.MAT_SEXO_MA_DEL_CTY,
                    MAT_EDAD_MA_DEL_CTY: matrimonio.MAT_EDAD_MA_DEL_CTY,
                    PAI_NACIONALIDAD_MA_DEL_CTY:
                        matrimonio.PAI_NACIONALIDAD_MA_DEL_CTY,
                    PAI_NACIONALIDAD_MA_DEL_CTY_DESC:
                        matrimonio.PAI_NACIONALIDAD_MA_DEL_CTY_DESC,
                    PAI_PAIS_NACI_MA_DEL_CTY:
                        matrimonio.PAI_PAIS_NACI_MA_DEL_CTY,
                    PAI_PAIS_NACI_MA_DEL_CTY_DESC:
                        matrimonio.PAI_PAIS_NACI_MA_DEL_CTY_DESC,
                    ENT_COD_NAC_MA_DEL_CTY: matrimonio.ENT_COD_NAC_MA_DEL_CTY,
                    MUN_COD_NAC_MA_DEL_CTY: matrimonio.MUN_COD_NAC_MA_DEL_CTY,
                    MAT_LOC_NAC_MA_DEL_CTY: matrimonio.MAT_LOC_NAC_MA_DEL_CTY,
                    MAT_NOM_PA_DELA_CTY: matrimonio.MAT_NOM_PA_DELA_CTY,
                    MAT_PRIMER_AP_PA_DELA_CTY:
                        matrimonio.MAT_PRIMER_AP_PA_DELA_CTY,
                    MAT_SEGUNDO_AP_PA_DELA_CTY:
                        matrimonio.MAT_SEGUNDO_AP_PA_DELA_CTY,
                    MAT_FECHA_NAC_PA_DELA_CTY:
                        matrimonio.MAT_FECHA_NAC_PA_DELA_CTY,
                    MAT_SEXO_PA_DELA_CTY: matrimonio.MAT_SEXO_PA_DELA_CTY,
                    MAT_EDAD_PA_DELA_CTY: matrimonio.MAT_EDAD_PA_DELA_CTY,
                    PAI_NACIONALIDAD_PA_DELA_CTY:
                        matrimonio.PAI_NACIONALIDAD_PA_DELA_CTY,
                    PAI_NACIONALIDAD_PA_DELA_CTY_DESC:
                        matrimonio.PAI_NACIONALIDAD_PA_DELA_CTY_DESC,
                    PAI_PAIS_NACI_PA_DELA_CTY:
                        matrimonio.PAI_PAIS_NACI_PA_DELA_CTY,
                    PAI_PAIS_NACI_PA_DELA_CTY_DESC:
                        matrimonio.PAI_PAIS_NACI_PA_DELA_CTY_DESC,
                    ENT_COD_NAC_PA_DELA_CTY: matrimonio.ENT_COD_NAC_PA_DELA_CTY,
                    MUN_COD_NAC_PA_DELA_CTY: matrimonio.MUN_COD_NAC_PA_DELA_CTY,
                    MAT_LOC_NAC_PA_DELA_CTY: matrimonio.MAT_LOC_NAC_PA_DELA_CTY,
                    MAT_NOM_MA_DELA_CTY: matrimonio.MAT_NOM_MA_DELA_CTY,
                    MAT_PRIMER_AP_MA_DELA_CTY:
                        matrimonio.MAT_PRIMER_AP_MA_DELA_CTY,
                    MAT_SEGUNDO_AP_MA_DELA_CTY:
                        matrimonio.MAT_SEGUNDO_AP_MA_DELA_CTY,
                    MAT_FECHA_NAC_MA_DELA_CTY:
                        matrimonio.MAT_FECHA_NAC_MA_DELA_CTY,
                    MAT_SEXO_MA_DELA_CTY: matrimonio.MAT_SEXO_MA_DELA_CTY,
                    MAT_EDAD_MA_DELA_CTY: matrimonio.MAT_EDAD_MA_DELA_CTY,
                    PAI_NACIONALIDAD_MA_DELA_CTY:
                        matrimonio.PAI_NACIONALIDAD_MA_DELA_CTY,
                    PAI_NACIONALIDAD_MA_DELA_CTY_DESC:
                        matrimonio.PAI_NACIONALIDAD_MA_DELA_CTY_DESC,
                    PAI_PAIS_NACI_MA_DELA_CTY:
                        matrimonio.PAI_PAIS_NACI_MA_DELA_CTY,
                    PAI_PAIS_NACI_MA_DELA_CTY_DESC:
                        matrimonio.PAI_PAIS_NACI_MA_DELA_CTY_DESC,
                    ENT_COD_NAC_MA_DELA_CTY: matrimonio.ENT_COD_NAC_MA_DELA_CTY,
                    MUN_COD_NAC_MA_DELA_CTY: matrimonio.MUN_COD_NAC_MA_DELA_CTY,
                    MAT_LOC_NAC_MA_DELA_CTY: matrimonio.MAT_LOC_NAC_MA_DELA_CTY,
                    CONSIENTEN: matrimonio.CONSIENTEN,
                    NAC_ENT_CODIGO_REG_DEL_CTY:
                        matrimonio.NAC_ENT_CODIGO_REG_DEL_CTY,
                    NAC_MUN_CODIGO_REG_DEL_CTY:
                        matrimonio.NAC_MUN_CODIGO_REG_DEL_CTY,
                    NAC_OFI_CODIGO_REG_DEL_CTY:
                        matrimonio.NAC_OFI_CODIGO_REG_DEL_CTY,
                    NAC_ANIO_REG_DEL_CTY: matrimonio.NAC_ANIO_REG_DEL_CTY,
                    NAC_ACTA_NUMERO_REG_DEL_CTY:
                        matrimonio.NAC_ACTA_NUMERO_REG_DEL_CTY,
                    NAC_ACTA_BIS_REG_DEL_CTY:
                        matrimonio.NAC_ACTA_BIS_REG_DEL_CTY,
                    NAC_ENT_CODIGO_REG_DELA_CTY:
                        matrimonio.NAC_ENT_CODIGO_REG_DELA_CTY,
                    NAC_MUN_CODIGO_REG_DELA_CTY:
                        matrimonio.NAC_MUN_CODIGO_REG_DELA_CTY,
                    NAC_OFI_CODIGO_REG_DELA_CTY:
                        matrimonio.NAC_OFI_CODIGO_REG_DELA_CTY,
                    NAC_ANIO_REG_DELA_CTY: matrimonio.NAC_ANIO_REG_DELA_CTY,
                    NAC_ACTA_NUMERO_REG_DELA_CTY:
                        matrimonio.NAC_ACTA_NUMERO_REG_DELA_CTY,
                    NAC_ACTA_BIS_REG_DELA_CTY:
                        matrimonio.NAC_ACTA_BIS_REG_DELA_CTY,
                    NAC_ENT_CODIGO_REG_DEL_PA_CTY:
                        matrimonio.NAC_ENT_CODIGO_REG_DEL_PA_CTY,
                    NAC_MUN_CODIGO_REG_DEL_PA_CTY:
                        matrimonio.NAC_MUN_CODIGO_REG_DEL_PA_CTY,
                    NAC_OFI_CODIGO_REG_DEL_PA_CTY:
                        matrimonio.NAC_OFI_CODIGO_REG_DEL_PA_CTY,
                    NAC_ANIO_REG_DEL_PA_CTY: matrimonio.NAC_ANIO_REG_DEL_PA_CTY,
                    NAC_ACTA_NUMERO_REG_DEL_PA_CTY:
                        matrimonio.NAC_ACTA_NUMERO_REG_DEL_PA_CTY,
                    NAC_ACTA_BIS_REG_DEL_PA_CTY:
                        matrimonio.NAC_ACTA_BIS_REG_DEL_PA_CTY,
                    NAC_ENT_CODIGO_REG_DEL_MA_CTY:
                        matrimonio.NAC_ENT_CODIGO_REG_DEL_MA_CTY,
                    NAC_MUN_CODIGO_REG_DEL_MA_CTY:
                        matrimonio.NAC_MUN_CODIGO_REG_DEL_MA_CTY,
                    NAC_OFI_CODIGO_REG_DEL_MA_CTY:
                        matrimonio.NAC_OFI_CODIGO_REG_DEL_MA_CTY,
                    NAC_ANIO_REG_DEL_MA_CTY: matrimonio.NAC_ANIO_REG_DEL_MA_CTY,
                    NAC_ACTA_NUMERO_REG_DEL_MA_CTY:
                        matrimonio.NAC_ACTA_NUMERO_REG_DEL_MA_CTY,
                    NAC_ACTA_BIS_REG_DEL_MA_CTY:
                        matrimonio.NAC_ACTA_BIS_REG_DEL_MA_CTY,
                    NAC_ENT_CODIGO_REG_DELA_PA_CTY:
                        matrimonio.NAC_ENT_CODIGO_REG_DELA_PA_CTY,
                    NAC_MUN_CODIGO_REG_DELA_PA_CTY:
                        matrimonio.NAC_MUN_CODIGO_REG_DELA_PA_CTY,
                    NAC_OFI_CODIGO_REG_DELA_PA_CTY:
                        matrimonio.NAC_OFI_CODIGO_REG_DELA_PA_CTY,
                    NAC_ANIO_REG_DELA_PA_CTY:
                        matrimonio.NAC_ANIO_REG_DELA_PA_CTY,
                    NAC_ACTA_NUMERO_DELA_PA_CTY:
                        matrimonio.NAC_ACTA_NUMERO_DELA_PA_CTY,
                    NAC_ACTA_BIS_REG_DELA_PA_CTY:
                        matrimonio.NAC_ACTA_BIS_REG_DELA_PA_CTY,
                    NAC_ENT_CODIGO_REG_DELA_MA_CTY:
                        matrimonio.NAC_ENT_CODIGO_REG_DELA_MA_CTY,
                    NAC_MUN_CODIGO_REG_DELA_MA_CTY:
                        matrimonio.NAC_MUN_CODIGO_REG_DELA_MA_CTY,
                    NAC_OFI_CODIGO_REG_DELA_MA_CTY:
                        matrimonio.NAC_OFI_CODIGO_REG_DELA_MA_CTY,
                    NAC_ANIO_REG_DELA_MA_CTY:
                        matrimonio.NAC_ANIO_REG_DELA_MA_CTY,
                    NAC_ACTA_NUMERO_DELA_MA_CTY:
                        matrimonio.NAC_ACTA_NUMERO_DELA_MA_CTY,
                    NAC_ACTA_BIS_REG_DELA_MA_CTY:
                        matrimonio.NAC_ACTA_BIS_REG_DELA_MA_CTY,
                    MAT_TIPO_PERSONA: matrimonio.MAT_TIPO_PERSONA,
                    valorMovim: matrimonio.valorMovim,
                    identElectr: matrimonio.identElectr,
                    actaBisRegEl: matrimonio.actaBisRegEl,
                    actaBisRegElla: matrimonio.actaBisRegElla,
                    actaBisRegMadreEl: matrimonio.actaBisRegMadreEl,
                    actaBisRegMadreElla: matrimonio.actaBisRegMadreElla,
                    actaBisRegPadreEl: matrimonio.actaBisRegPadreEl,
                    actaBisRegPadreElla: matrimonio.actaBisRegPadreElla,
                    actaNumeroRegEl: matrimonio.actaNumeroRegEl,
                    actaNumeroRegElla: matrimonio.actaNumeroRegElla,
                    actaNumeroRegMadreEl: matrimonio.actaNumeroRegMadreEl,
                    actaNumeroRegMadreElla: matrimonio.actaNumeroRegMadreElla,
                    actaNumeroRegPadreEl: matrimonio.actaNumeroRegPadreEl,
                    actaNumeroRegPadreElla: matrimonio.actaNumeroRegPadreElla,
                    anioRegEl: matrimonio.anioRegEl,
                    anioRegElla: matrimonio.anioRegElla,
                    anioRegMadreEl: matrimonio.anioRegMadreEl,
                    anioRegMadreElla: matrimonio.anioRegMadreElla,
                    anioRegPadreEl: matrimonio.anioRegPadreEl,
                    anioRegPadreElla: matrimonio.anioRegPadreElla,
                    consentimiento: matrimonio.consentimiento,
                    cripEl: matrimonio.cripEl,
                    cripElla: matrimonio.cripElla,
                    curpEl: matrimonio.curpEl,
                    curpElla: matrimonio.curpElla,
                    edadEl: matrimonio.edadEl,
                    edadElla: matrimonio.edadElla,
                    edadMadreEl: matrimonio.edadMadreEl,
                    edadMadreElla: matrimonio.edadMadreElla,
                    edadPadreEl: matrimonio.edadPadreEl,
                    edadPadreElla: matrimonio.edadPadreElla,
                    entidadCodigoEl: matrimonio.entidadCodigoEl,
                    entidadCodigoElla: matrimonio.entidadCodigoElla,
                    entidadCodigoMadreEl: matrimonio.entidadCodigoMadreEl,
                    entidadCodigoMadreElla: matrimonio.entidadCodigoMadreElla,
                    entidadCodigoPadreEl: matrimonio.entidadCodigoPadreEl,
                    entidadCodigoPadreElla: matrimonio.entidadCodigoPadreElla,
                    entidadCodigoRegEl: matrimonio.entidadCodigoRegEl,
                    entidadCodigoRegElTxt: matrimonio.entidadCodigoRegElTxt,
                    entidadCodigoRegElla: matrimonio.entidadCodigoRegElla,
                    entidadCodigoRegEllaTxt: matrimonio.entidadCodigoRegEllaTxt,
                    entidadCodigoRegMadreEl: matrimonio.entidadCodigoRegMadreEl,
                    entidadCodigoRegMadreElla:
                        matrimonio.entidadCodigoRegMadreElla,
                    entidadCodigoRegPadreEl: matrimonio.entidadCodigoRegPadreEl,
                    entidadCodigoRegPadreElla:
                        matrimonio.entidadCodigoRegPadreElla,
                    fechaModificacion: matrimonio.fechaModificacion,
                    fechaNacimientoEl: matrimonio.fechaNacimientoEl,
                    fechaNacimientoElTxt: matrimonio.fechaNacimientoElTxt,
                    fechaNacimientoElla: matrimonio.fechaNacimientoElla,
                    fechaNacimientoEllaTxt: matrimonio.fechaNacimientoEllaTxt,
                    fechaNacimientoMadreEl: matrimonio.fechaNacimientoMadreEl,
                    fechaNacimientoMadreElla:
                        matrimonio.fechaNacimientoMadreElla,
                    fechaNacimientoPadreEl: matrimonio.fechaNacimientoPadreEl,
                    fechaNacimientoPadreElla:
                        matrimonio.fechaNacimientoPadreElla,
                    fechaOri: matrimonio.fechaOri,
                    fechaRegistroDate: matrimonio.fechaRegistroDate,
                    imaNombreHomologado: matrimonio.imaNombreHomologado,
                    llave: matrimonio.llave,
                    localidadEl: matrimonio.localidadEl,
                    localidadElla: matrimonio.localidadElla,
                    localidadMadreEl: matrimonio.localidadMadreEl,
                    localidadMadreElla: matrimonio.localidadMadreElla,
                    localidadPadreEl: matrimonio.localidadPadreEl,
                    localidadPadreElla: matrimonio.localidadPadreElla,
                    matArchivoOrigen: matrimonio.matArchivoOrigen,
                    matDocExtranjero: matrimonio.matDocExtranjero,
                    matErrorOrigen: matrimonio.matErrorOrigen,
                    matRegimenPatrimonial: matrimonio.matRegimenPatrimonial,
                    municipioCodigoEl: matrimonio.municipioCodigoEl,
                    municipioCodigoElla: matrimonio.municipioCodigoElla,
                    municipioCodigoMadreEl: matrimonio.municipioCodigoMadreEl,
                    municipioCodigoMadreElla:
                        matrimonio.municipioCodigoMadreElla,
                    municipioCodigoPadreEl: matrimonio.municipioCodigoPadreEl,
                    municipioCodigoPadreElla:
                        matrimonio.municipioCodigoPadreElla,
                    municipioCodigoRegEl: matrimonio.municipioCodigoRegEl,
                    municipioCodigoRegElla: matrimonio.municipioCodigoRegElla,
                    municipioCodigoRegMadreEl:
                        matrimonio.municipioCodigoRegMadreEl,
                    municipioCodigoRegMadreElla:
                        matrimonio.municipioCodigoRegMadreElla,
                    municipioCodigoRegPadreEl:
                        matrimonio.municipioCodigoRegPadreEl,
                    municipioCodigoRegPadreElla:
                        matrimonio.municipioCodigoRegPadreElla,
                    nacionalidadEl: matrimonio.nacionalidadEl,
                    nacionalidadElTxt: matrimonio.nacionalidadElTxt,
                    nacionalidadElla: matrimonio.nacionalidadElla,
                    nacionalidadEllaTxt: matrimonio.nacionalidadEllaTxt,
                    nacionalidadMadreEl: matrimonio.nacionalidadMadreEl,
                    nacionalidadMadreElla: matrimonio.nacionalidadMadreElla,
                    nacionalidadPadreEl: matrimonio.nacionalidadPadreEl,
                    nacionalidadPadreElla: matrimonio.nacionalidadPadreElla,
                    nombreEl: matrimonio.nombreEl,
                    nombreElla: matrimonio.nombreElla,
                    nombreMadreEl: matrimonio.nombreMadreEl,
                    nombreMadreElla: matrimonio.nombreMadreElla,
                    nombrePadreEl: matrimonio.nombrePadreEl,
                    nombrePadreElla: matrimonio.nombrePadreElla,
                    ofiCodigoRegEl: matrimonio.ofiCodigoRegEl,
                    ofiCodigoRegElla: matrimonio.ofiCodigoRegElla,
                    ofiCodigoRegMadreEl: matrimonio.ofiCodigoRegMadreEl,
                    ofiCodigoRegMadreElla: matrimonio.ofiCodigoRegMadreElla,
                    ofiCodigoRegPadreEl: matrimonio.ofiCodigoRegPadreEl,
                    ofiCodigoRegPadreElla: matrimonio.ofiCodigoRegPadreElla,
                    paisEl: matrimonio.paisEl,
                    paisElla: matrimonio.paisElla,
                    paisMadreEl: matrimonio.paisMadreEl,
                    paisMadreElla: matrimonio.paisMadreElla,
                    paisPadreEl: matrimonio.paisPadreEl,
                    paisPadreElla: matrimonio.paisPadreElla,
                    primerApellidoEl: matrimonio.primerApellidoEl,
                    primerApellidoElla: matrimonio.primerApellidoElla,
                    primerApellidoMadreEl: matrimonio.primerApellidoMadreEl,
                    primerApellidoMadreElla: matrimonio.primerApellidoMadreElla,
                    primerApellidoPadreEl: matrimonio.primerApellidoPadreEl,
                    primerApellidoPadreElla: matrimonio.primerApellidoPadreElla,
                    regimenPatrimonialTxt: matrimonio.regimenPatrimonialTxt,
                    segundoApellidoEl: matrimonio.segundoApellidoEl,
                    segundoApellidoElla: matrimonio.segundoApellidoElla,
                    segundoApellidoMadreEl: matrimonio.segundoApellidoMadreEl,
                    segundoApellidoMadreElla:
                        matrimonio.segundoApellidoMadreElla,
                    segundoApellidoPadreEl: matrimonio.segundoApellidoPadreEl,
                    segundoApellidoPadreElla:
                        matrimonio.segundoApellidoPadreElla,
                    sexoEl: matrimonio.sexoEl,
                    sexoElla: matrimonio.sexoElla,
                    sexoMadreEl: matrimonio.sexoMadreEl,
                    sexoMadreElla: matrimonio.sexoMadreElla,
                    sexoPadreEl: matrimonio.sexoPadreEl,
                    sexoPadreElla: matrimonio.sexoPadreElla,
                    actaBis: matrimonio.actaBis,
                    anioRegistro: matrimonio.anioRegistro,
                    cadena: matrimonio.cadena,
                    curp: matrimonio.curp,
                    curpAux1: matrimonio.curpAux1,
                    curpAux2: matrimonio.curpAux2,
                    curpMADRE: matrimonio.curpMADRE,
                    curpPADRE: matrimonio.curpPADRE,
                    estadoNac: matrimonio.estadoNac,
                    estadoNacNombre: matrimonio.estadoNacNombre,
                    estadoReg: matrimonio.estadoReg,
                    estadoRegNombre: matrimonio.estadoRegNombre,
                    fechaNacimiento: matrimonio.fechaNacimiento,
                    fechaRegistro: matrimonio.fechaRegistro,
                    foja: matrimonio.foja,
                    folio: matrimonio.folio,
                    libro: matrimonio.libro,
                    localidad: matrimonio.localidad,
                    madre: matrimonio.madre,
                    municipio: matrimonio.municipio,
                    municipioNac: matrimonio.municipioNac,
                    municipioNacNombre: matrimonio.municipioNacNombre,
                    municipioNombre: matrimonio.municipioNombre,
                    municipioReg: matrimonio.municipioReg,
                    municipioRegNombre: matrimonio.municipioRegNombre,
                    nacMADRE: matrimonio.nacMADRE,
                    nacPADRE: matrimonio.nacPADRE,
                    nacionalidad: matrimonio.nacionalidad,
                    nacionalidadAux1: matrimonio.nacionalidadAux1,
                    nacionalidadAux1Txt: matrimonio.nacionalidadAux1Txt,
                    nacionalidadAux2: matrimonio.nacionalidadAux2,
                    nacionalidadAux2Txt: matrimonio.nacionalidadAux2Txt,
                    nacionalidadTxt: matrimonio.nacionalidadTxt,
                    noActa: matrimonio.noActa,
                    nombre: matrimonio.nombre,
                    nombrePrimeraPersona: matrimonio.nombrePrimeraPersona,
                    nombreSegundaPersona: matrimonio.nombreSegundaPersona,
                    notasMarginales: matrimonio.notasMarginales,
                    numeroActa: matrimonio.numeroActa,
                    oficialia: matrimonio.oficialia,
                    oficialiaNombre: matrimonio.oficialiaNombre,
                    padre: matrimonio.padre,
                    pais: matrimonio.pais,
                    paisTxt: matrimonio.paisTxt,
                    primerApellido: matrimonio.primerApellido,
                    primerApellidoPrimeraPersona:
                        matrimonio.primerApellidoPrimeraPersona,
                    primerApellidoSegundaPersona:
                        matrimonio.primerApellidoSegundaPersona,
                    segundoApellido: matrimonio.segundoApellido,
                    segundoApellidoPrimeraPersona:
                        matrimonio.segundoApellidoPrimeraPersona,
                    segundoApellidoSegundaPersona:
                        matrimonio.segundoApellidoSegundaPersona,
                    sello: matrimonio.sello,
                    sexo: matrimonio.sexo,
                    ssa: matrimonio.ssa,
                    tipoPersona: matrimonio.tipoPersona,
                    tomo: matrimonio.tomo,
                    transcripcion: matrimonio.transcripcion,
                    codigoCivil: matrimonio.codigoCivil,
                    estadoRegNacNombre: matrimonio.estadoRegNacNombre,
                };
                if (contador === 5000)
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                await Matrimonio.create(newActa);
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    skippedRecords.push(matrimonio.identificador_electronico);
                    console.log(
                        `Registro con id ${matrimonio.identificador_electronico} ya existe, omitiendo...`,
                    );
                } else {
                    throw error; // Propaga cualquier otro error que no sea de clave única
                }
            }
        }
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Error al obtener datos MATRIMONIO" });
    }
};

const Acta_Defuncion = async (datosJson, iden, contador, req, res) => {
    try {
        const skippedRecords = [];
        for (const defuncion of datosJson.defunciones) {
            try {
                const newActa = {
                    identificador: iden,
                    NA_NUMEROACTA: defuncion.NA_NUMEROACTA,
                    NA_ANIOREGISTRO: defuncion.NA_ANIOREGISTRO,
                    NA_TIPODOCUMENTO: defuncion.NA_TIPODOCUMENTO,
                    NA_ENTIDADREGISTRO: defuncion.NA_ENTIDADREGISTRO,
                    NA_ENTIDADREGISTRONOMBRE:
                        defuncion.NA_ENTIDADREGISTRONOMBRE,
                    NA_MUNICIPIOREGISTRO: defuncion.NA_MUNICIPIOREGISTRO,
                    NA_MUNICIPIOREGISTRONOMBRE:
                        defuncion.NA_MUNICIPIOREGISTRONOMBRE,
                    NA_OFICIALIA: defuncion.NA_OFICIALIA,
                    NA_OFICIALIANOMBRE: defuncion.NA_OFICIALIANOMBRE,
                    NA_ACTABIS: defuncion.NA_ACTABIS,
                    OT_NOTASMARGINALES: defuncion.OT_NOTASMARGINALES,
                    OT_CRIP: defuncion.OT_CRIP,
                    OT_TIPODEFUNCION: defuncion.OT_TIPODEFUNCION,
                    OT_FECHAREGISTROENNACIMIENTO:
                        defuncion.OT_FECHAREGISTROENNACIMIENTO,
                    PE_EDAD: defuncion.PE_EDAD,
                    PE_LOCALIDADNACIMIENTO: defuncion.PE_LOCALIDADNACIMIENTO,
                    PE_LOCALIDADNACIMIENTONOMBRE:
                        defuncion.PE_LOCALIDADNACIMIENTONOMBRE,
                    PE_NACIONALIDAD: defuncion.PE_NACIONALIDAD,
                    PE_NACIONALIDAD_NUM: defuncion.PE_NACIONALIDAD_NUM,
                    PE_PAISNACIMIENTO: defuncion.PE_PAISNACIMIENTO,
                    PE_PAISNACIMIENTONOMBRE: defuncion.PE_PAISNACIMIENTONOMBRE,
                    PA_PRIMERAPELLIDO: defuncion.PA_PRIMERAPELLIDO,
                    PA_SEGUNDOAPELLIDO: defuncion.PA_SEGUNDOAPELLIDO,
                    PA_NOMBRES: defuncion.PA_NOMBRES,
                    PA_EDAD: defuncion.PA_EDAD,
                    PA_SEXO: defuncion.PA_SEXO,
                    PA_FECHANACIMIENTO: defuncion.PA_FECHANACIMIENTO,
                    PA_ENTIDADNACIMIENTO: defuncion.PA_ENTIDADNACIMIENTO,
                    PA_ENTIDADNACIMIENTONOMBRE:
                        defuncion.PA_ENTIDADNACIMIENTONOMBRE,
                    PA_MUNICIPIONACIMIENTO: defuncion.PA_MUNICIPIONACIMIENTO,
                    PA_MUNICIPIONACIMIENTONOMBRE:
                        defuncion.PA_MUNICIPIONACIMIENTONOMBRE,
                    PA_LOCALIDADNACIMIENTO: defuncion.PA_LOCALIDADNACIMIENTO,
                    PA_LOCALIDADNACIMIENTONOMBRE:
                        defuncion.PA_LOCALIDADNACIMIENTONOMBRE,
                    PA_NACIONALIDAD: defuncion.PA_NACIONALIDAD,
                    PA_NACIONALIDAD_NUM: defuncion.PA_NACIONALIDAD_NUM,
                    PA_PAISNACIMIENTO: defuncion.PA_PAISNACIMIENTO,
                    PA_PAISNACIMIENTONOMBRE: defuncion.PA_PAISNACIMIENTONOMBRE,
                    PA_CURP: defuncion.PA_CURP,
                    PA_NUMEROACTA: defuncion.PA_NUMEROACTA,
                    PA_ANIOREGISTRO: defuncion.PA_ANIOREGISTRO,
                    PA_TIPODOCUMENTO: defuncion.PA_TIPODOCUMENTO,
                    PA_ENTIDADREGISTRO: defuncion.PA_ENTIDADREGISTRO,
                    PA_ENTIDADREGISTRONOMBRE:
                        defuncion.PA_ENTIDADREGISTRONOMBRE,
                    PA_MUNICIPIOREGISTRO: defuncion.PA_MUNICIPIOREGISTRO,
                    PA_MUNICIPIOREGISTRONOMBRE:
                        defuncion.PA_MUNICIPIOREGISTRONOMBRE,
                    PA_OFICIALIA: defuncion.PA_OFICIALIA,
                    PA_OFICIALIANOMBRE: defuncion.PA_OFICIALIANOMBRE,
                    PA_ACTABIS: defuncion.PA_ACTABIS,
                    MA_NUMEROACTA: defuncion.MA_NUMEROACTA,
                    MA_ANIOREGISTRO: defuncion.MA_ANIOREGISTRO,
                    MA_TIPODOCUMENTO: defuncion.MA_TIPODOCUMENTO,
                    MA_ENTIDADREGISTRO: defuncion.MA_ENTIDADREGISTRO,
                    MA_ENTIDADREGISTRONOMBRE:
                        defuncion.MA_ENTIDADREGISTRONOMBRE,
                    MA_MUNICIPIOREGISTRO: defuncion.MA_MUNICIPIOREGISTRO,
                    MA_MUNICIPIOREGISTRONOMBRE:
                        defuncion.MA_MUNICIPIOREGISTRONOMBRE,
                    MA_OFICIALIA: defuncion.MA_OFICIALIA,
                    MA_OFICIALIANOMBRE: defuncion.MA_OFICIALIANOMBRE,
                    MA_ACTABIS: defuncion.MA_ACTABIS,
                    MA_PRIMERAPELLIDO: defuncion.MA_PRIMERAPELLIDO,
                    MA_SEGUNDOAPELLIDO: defuncion.MA_SEGUNDOAPELLIDO,
                    MA_NOMBRES: defuncion.MA_NOMBRES,
                    MA_EDAD: defuncion.MA_EDAD,
                    MA_SEXO: defuncion.MA_SEXO,
                    MA_FECHANACIMIENTO: defuncion.MA_FECHANACIMIENTO,
                    MA_ENTIDADNACIMIENTO: defuncion.MA_ENTIDADNACIMIENTO,
                    MA_ENTIDADNACIMIENTONOMBRE:
                        defuncion.MA_ENTIDADNACIMIENTONOMBRE,
                    MA_MUNICIPIONACIMIENTO: defuncion.MA_MUNICIPIONACIMIENTO,
                    MA_MUNICIPIONACIMIENTONOMBRE:
                        defuncion.MA_MUNICIPIONACIMIENTONOMBRE,
                    MA_LOCALIDADNACIMIENTO: defuncion.MA_LOCALIDADNACIMIENTO,
                    MA_LOCALIDADNACIMIENTONOMBRE:
                        defuncion.MA_LOCALIDADNACIMIENTONOMBRE,
                    MA_NACIONALIDAD: defuncion.MA_NACIONALIDAD,
                    MA_NACIONALIDAD_NUM: defuncion.MA_NACIONALIDAD_NUM,
                    MA_PAISNACIMIENTO: defuncion.MA_PAISNACIMIENTO,
                    MA_PAISNACIMIENTONOMBRE: defuncion.MA_PAISNACIMIENTONOMBRE,
                    MA_CURP: defuncion.MA_CURP,
                    CY_PRIMERAPELLIDO: defuncion.CY_PRIMERAPELLIDO,
                    CY_SEGUNDOAPELLIDO: defuncion.CY_SEGUNDOAPELLIDO,
                    CY_NOMBRES: defuncion.CY_NOMBRES,
                    CY_EDAD: defuncion.CY_EDAD,
                    CY_SEXO: defuncion.CY_SEXO,
                    CY_FECHANACIMIENTO: defuncion.CY_FECHANACIMIENTO,
                    CY_ENTIDADNACIMIENTO: defuncion.CY_ENTIDADNACIMIENTO,
                    CY_ENTIDADNACIMIENTONOMBRE:
                        defuncion.CY_ENTIDADNACIMIENTONOMBRE,
                    CY_MUNICIPIONACIMIENTO: defuncion.CY_MUNICIPIONACIMIENTO,
                    CY_MUNICIPIONACIMIENTONOMBRE:
                        defuncion.CY_MUNICIPIONACIMIENTONOMBRE,
                    CY_LOCALIDADNACIMIENTO: defuncion.CY_LOCALIDADNACIMIENTO,
                    CY_LOCALIDADNACIMIENTONOMBRE:
                        defuncion.CY_LOCALIDADNACIMIENTONOMBRE,
                    CY_NACIONALIDAD: defuncion.CY_NACIONALIDAD,
                    CY_PAISNACIMIENTO: defuncion.CY_PAISNACIMIENTO,
                    CY_PAISNACIMIENTONOMBRE: defuncion.CY_PAISNACIMIENTONOMBRE,
                    CY_CURP: defuncion.CY_CURP,
                    CY_NUMEROACTA: defuncion.CY_NUMEROACTA,
                    CY_ANIOREGISTRO: defuncion.CY_ANIOREGISTRO,
                    CY_TIPODOCUMENTO: defuncion.CY_TIPODOCUMENTO,
                    CY_ENTIDADREGISTRO: defuncion.CY_ENTIDADREGISTRO,
                    CY_ENTIDADREGISTRONOMBRE:
                        defuncion.CY_ENTIDADREGISTRONOMBRE,
                    CY_MUNICIPIOREGISTRO: defuncion.CY_MUNICIPIOREGISTRO,
                    CY_MUNICIPIOREGISTRONOMBRE:
                        defuncion.CY_MUNICIPIOREGISTRONOMBRE,
                    CY_OFICIALIA: defuncion.CY_OFICIALIA,
                    CY_OFICIALIANOMBRE: defuncion.CY_OFICIALIANOMBRE,
                    CY_ACTABIS: defuncion.CY_ACTABIS,
                    OT_FIRMA: defuncion.OT_FIRMA,
                    OT_LLAVERENADI: defuncion.OT_LLAVERENADI,
                    OT_CERTIFICADO_DE: defuncion.OT_CERTIFICADO_DE,
                    PE_EDAD_ANIO: defuncion.PE_EDAD_ANIO,
                    PE_EDAD_MES: defuncion.PE_EDAD_MES,
                    PE_EDAD_DIA: defuncion.PE_EDAD_DIA,
                    PE_EDAD_HORA: defuncion.PE_EDAD_HORA,
                    FECHA_ACTUAL: defuncion.FECHA_ACTUAL,
                    fechaOri: defuncion.fechaOri,
                    identElectr: defuncion.identElectr,
                    valorMovim: defuncion.valorMovim,
                    causasDefuncion: defuncion.causasDefuncion,
                    destinoCadaver: defuncion.destinoCadaver,
                    estadoCivil: defuncion.estadoCivil,
                    estadoCivilTxt: defuncion.estadoCivilTxt,
                    fechaDefuncion: defuncion.fechaDefuncion,
                    fechaDefuncionDate: defuncion.fechaDefuncionDate,
                    fechaDefuncionTxt: defuncion.fechaDefuncionTxt,
                    fechaNacimientoDate: defuncion.fechaNacimientoDate,
                    fechaRegistroDate: defuncion.fechaRegistroDate,
                    hora: defuncion.hora,
                    lugarDefuncion: defuncion.lugarDefuncion,
                    minutos: defuncion.minutos,
                    nombreConyuge: defuncion.nombreConyuge,
                    actaBis: defuncion.actaBis,
                    anioRegistro: defuncion.anioRegistro,
                    cadena: defuncion.cadena,
                    curp: defuncion.curp,
                    curpAux1: defuncion.curpAux1,
                    curpAux2: defuncion.curpAux2,
                    curpMADRE: defuncion.curpMADRE,
                    curpPADRE: defuncion.curpPADRE,
                    estadoNac: defuncion.estadoNac,
                    estadoNacNombre: defuncion.estadoNacNombre,
                    estadoReg: defuncion.estadoReg,
                    estadoRegNombre: defuncion.estadoRegNombre,
                    fechaNacimiento: defuncion.fechaNacimiento,
                    fechaRegistro: defuncion.fechaRegistro,
                    foja: defuncion.foja,
                    folio: defuncion.folio,
                    libro: defuncion.libro,
                    localidad: defuncion.localidad,
                    madre: defuncion.madre,
                    municipio: defuncion.municipio,
                    municipioNac: defuncion.municipioNac,
                    municipioNacNombre: defuncion.municipioNacNombre,
                    municipioNombre: defuncion.municipioNombre,
                    municipioReg: defuncion.municipioReg,
                    municipioRegNombre: defuncion.municipioRegNombre,
                    nacMADRE: defuncion.nacMADRE,
                    nacPADRE: defuncion.nacPADRE,
                    nacionalidad: defuncion.nacionalidad,
                    nacionalidadAux1: defuncion.nacionalidadAux1,
                    nacionalidadAux1Txt: defuncion.nacionalidadAux1Txt,
                    nacionalidadAux2: defuncion.nacionalidadAux2,
                    nacionalidadAux2Txt: defuncion.nacionalidadAux2Txt,
                    nacionalidadTxt: defuncion.nacionalidadTxt,
                    noActa: defuncion.noActa,
                    nombre: defuncion.nombre,
                    nombrePrimeraPersona: defuncion.nombrePrimeraPersona,
                    nombreSegundaPersona: defuncion.nombreSegundaPersona,
                    notasMarginales: defuncion.notasMarginales,
                    numeroActa: defuncion.numeroActa,
                    oficialia: defuncion.oficialia,
                    oficialiaNombre: defuncion.oficialiaNombre,
                    padre: defuncion.padre,
                    pais: defuncion.pais,
                    paisTxt: defuncion.paisTxt,
                    primerApellido: defuncion.primerApellido,
                    primerApellidoPrimeraPersona:
                        defuncion.primerApellidoPrimeraPersona,
                    primerApellidoSegundaPersona:
                        defuncion.primerApellidoSegundaPersona,
                    segundoApellido: defuncion.segundoApellido,
                    segundoApellidoPrimeraPersona:
                        defuncion.segundoApellidoPrimeraPersona,
                    segundoApellidoSegundaPersona:
                        defuncion.segundoApellidoSegundaPersona,
                    sello: defuncion.sello,
                    sexo: defuncion.sexo,
                    ssa: defuncion.ssa,
                    tipoPersona: defuncion.tipoPersona,
                    tomo: defuncion.tomo,
                    transcripcion: defuncion.transcripcion,
                    codigoCivil: defuncion.codigoCivil,
                    estadoRegNacNombre: defuncion.estadoRegNacNombre,
                };
                if (contador === 5000)
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                await Defuncion.create(newActa);
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    skippedRecords.push(defuncion.identificador_electronico);
                    console.log(
                        `Registro con id ${defuncion.identificador_electronico} ya existe, omitiendo...`,
                    );
                } else {
                    throw error; // Propaga cualquier otro error que no sea de clave única
                }
            }
        }
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Error al obtener datos DEFUNCION" });
    }
};

export const Hola = async (req, res) => {
    const data = req.body;
    try {
        if (
            data.nacimientos &&
            Array.isArray(data.nacimientos) &&
            data.nacimientos.length > 0
        ) {
            await Acta_NacimientoPython(data.nacimientos, data.identificador);
        }

        if (
            data.matrimonios &&
            Array.isArray(data.matrimonios) &&
            data.matrimonios.length > 0
        ) {
            await Acta_MatrimoniosPython(data.matrimonios, data.identificador);
        }

        if (
            data.defunciones &&
            Array.isArray(data.defunciones) &&
            data.defunciones.length > 0
        ) {
            await Acta_DefuncionesPython(data.defunciones, data.identificador);
        }
        if (
            data.reconocimientos &&
            Array.isArray(data.reconocimientos) &&
            data.reconocimientos.length > 0
        ) {
            await Acta_adopcionPython(data.reconocimientos, data.identificador);
        }
        if (
            data.divorcios &&
            Array.isArray(data.divorcios) &&
            data.divorcios.length > 0
        ) {
            Acta_DivorcioPython(data.divorcios, data.identificador);
        }
        if (
            (!data.nacimientos ||
                !Array.isArray(data.nacimientos) ||
                data.nacimientos.length === 0) &&
            (!data.matrimonios ||
                !Array.isArray(data.matrimonios) ||
                data.matrimonios.length === 0) &&
            (!data.defunciones ||
                !Array.isArray(data.defunciones) ||
                data.defunciones.length === 0)
        ) {
            await Otro.create({ identificadornew: data.identificador });
        }
    } catch (error) {
        console.log(error, " que bueno");
    }
};

const Acta_NacimientoPython = async (datosJson, iden, req, res) => {
    const skippedRecords = [];
    try {
        const dataToCreate = {
            identificador: iden, // Asegúrate de que este campo es el correcto
            ...datosJson[0],
        };
        const agregar = await Nacimiento.create(dataToCreate);
        console.log("NACIMIENTO");
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            skippedRecords.push(nacimientos.identificador_electronico);
            console.log(`Registro con id ${iden} ya existe, omitiendo...`);
        } else {
            throw error; // Propaga cualquier otro error que no sea de clave única
        }
    }
};

const Acta_MatrimoniosPython = async (datosJson, iden, req, res) => {
    const skippedRecords = [];
    try {
        const dataToCreate = {
            identificador: iden,
            ...datosJson[0],
        };
        const agregado = await Matrimonio.create(dataToCreate);
        console.log("MATRIMONIO");
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            skippedRecords.push(nacimiento.identificador_electronico);
            console.log(
                `Registro con id ${nacimiento.identificador_electronico} ya existe, omitiendo...`,
            );
        } else {
            throw error; // Propaga cualquier otro error que no sea de clave única
        }
    }
};

const Acta_DefuncionesPython = async (datosJson, iden, req, res) => {
    const skippedRecords = [];
    try {
        const dataToCreate = {
            identificador: iden,
            ...datosJson[0],
        };
        const agregado = await Defuncion.create(dataToCreate);
        console.log("DEFUNCION");
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            skippedRecords.push(nacimiento.identificador_electronico);
            console.log(
                `Registro con id ${nacimiento.identificador_electronico} ya existe, omitiendo...`,
            );
        } else {
            throw error; // Propaga cualquier otro error que no sea de clave única
        }
    }
};

const Acta_DivorcioPython = async (datosJson, iden, req, res) => {
    try {
        let processedCount = 0;
        for (const divorcio of datosJson.divorcios) {
            try {
                const newActa = {
                    identificador: iden,
                    ssa: divorcio.ssa,
                    anio: divorcio.anio,
                    curp: divorcio.curp,
                    foja: divorcio.foja,
                    pais: divorcio.pais,
                    sexo: divorcio.sexo,
                    tomo: divorcio.tomo,
                    folio: divorcio.folio,
                    libro: divorcio.libro,
                    llave: divorcio.llave,
                    madre: divorcio.madre,
                    padre: divorcio.padre,
                    sello: divorcio.sello,
                    cadena: divorcio.cadena,
                    cripEl: divorcio.cripEl,
                    curpEl: divorcio.curpEl,
                    edadEl: divorcio.edadEl,
                    noActa: divorcio.noActa,
                    nombre: divorcio.nombre,
                    sexoEl: divorcio.sexoEl,
                    actaBis: divorcio.actaBis,
                    paisTxt: divorcio.paisTxt,
                    cripElla: divorcio.cripElla,
                    curpAux1: divorcio.curpAux1,
                    curpAux2: divorcio.curpAux2,
                    curpElla: divorcio.curpElla,
                    edadElla: divorcio.edadElla,
                    nacMADRE: divorcio.nacMADRE,
                    nacPADRE: divorcio.nacPADRE,
                    nombreEl: divorcio.nombreEl,
                    sexoElla: divorcio.sexoElla,
                    actaRegEl: divorcio.actaRegEl,
                    anioRegEl: divorcio.anioRegEl,
                    curpMADRE: divorcio.curpMADRE,
                    curpPADRE: divorcio.curpPADRE,
                    estadoNac: divorcio.estadoNac,
                    estadoReg: divorcio.estadoReg,
                    localidad: divorcio.localidad,
                    matEntReg: divorcio.matEntReg,
                    matMunReg: divorcio.matMunReg,
                    municipio: divorcio.municipio,
                    ofiCodigo: divorcio.ofiCodigo,
                    oficialia: divorcio.oficialia,
                    paisNacEl: divorcio.paisNacEl,
                    actaNumero: divorcio.actaNumero,
                    divFirmaRc: divorcio.divFirmaRc,
                    matAnioReg: divorcio.matAnioReg,
                    nombreElla: divorcio.nombreElla,
                    numeroActa: divorcio.numeroActa,
                    valorMovim: divorcio.valorMovim,
                    DIV_CRIP_EL: divorcio.DIV_CRIP_EL,
                    DIV_FIRMARC: divorcio.DIV_FIRMARC,
                    IND_CURP_EL: divorcio.IND_CURP_EL,
                    MAT_ENT_REG: divorcio.MAT_ENT_REG,
                    MAT_MUN_REG: divorcio.MAT_MUN_REG,
                    actaRegElla: divorcio.actaRegElla,
                    anioRegElla: divorcio.anioRegElla,
                    codigoCivil: divorcio.codigoCivil,
                    divFechaOri: divorcio.divFechaOri,
                    errorOrigen: divorcio.errorOrigen,
                    identElectr: divorcio.identElectr,
                    paisNacElla: divorcio.paisNacElla,
                    tipoPersona: divorcio.tipoPersona,
                    MAT_ANIO_REG: divorcio.MAT_ANIO_REG,
                    actaBisRegEl: divorcio.actaBisRegEl,
                    anioRegistro: divorcio.anioRegistro,
                    entidadNacEl: divorcio.entidadNacEl,
                    municipioNac: divorcio.municipioNac,
                    municipioReg: divorcio.municipioReg,
                    nacionalidad: divorcio.nacionalidad,
                    tipoDivorcio: divorcio.tipoDivorcio,
                    DIV_CRIP_ELLA: divorcio.DIV_CRIP_ELLA,
                    DIV_FECHA_ORI: divorcio.DIV_FECHA_ORI,
                    IND_CURP_ELLA: divorcio.IND_CURP_ELLA,
                    archivoOrigen: divorcio.archivoOrigen,
                    fechaNacRegEl: divorcio.fechaNacRegEl,
                    fechaRegistro: divorcio.fechaRegistro,
                    matActaBisReg: divorcio.matActaBisReg,
                    transcripcion: divorcio.transcripcion,
                    actaBisRegElla: divorcio.actaBisRegElla,
                    entidadNacElla: divorcio.entidadNacElla,
                    localidadNacEl: divorcio.localidadNacEl,
                    matOficiliaReg: divorcio.matOficiliaReg,
                    municipioNacEl: divorcio.municipioNacEl,
                    nacionalidadEl: divorcio.nacionalidadEl,
                    ofiCodigoRegEl: divorcio.ofiCodigoRegEl,
                    primerApellido: divorcio.primerApellido,
                    estadoNacNombre: divorcio.estadoNacNombre,
                    estadoRegNombre: divorcio.estadoRegNombre,
                    fechaNacRegElla: divorcio.fechaNacRegElla,
                    fechaNacimiento: divorcio.fechaNacimiento,
                    fechaResolucion: divorcio.fechaResolucion,
                    municipioNombre: divorcio.municipioNombre,
                    nacionalidadTxt: divorcio.nacionalidadTxt,
                    notasMarginales: divorcio.notasMarginales,
                    oficialiaNombre: divorcio.oficialiaNombre,
                    segundoApellido: divorcio.segundoApellido,
                    tipoDivorcioTxt: divorcio.tipoDivorcioTxt,
                    DIV_TIPO_PERSONA: divorcio.DIV_TIPO_PERSONA,
                    MAT_ACTA_BIS_REG: divorcio.MAT_ACTA_BIS_REG,
                    MAT_ENT_REG_DESC: divorcio.MAT_ENT_REG_DESC,
                    MAT_MUN_REG_DESC: divorcio.MAT_MUN_REG_DESC,
                    localidadNacElla: divorcio.localidadNacElla,
                    matActaNumeroReg: divorcio.matActaNumeroReg,
                    municipioNacElla: divorcio.municipioNacElla,
                    nacionalidadAux1: divorcio.nacionalidadAux1,
                    nacionalidadAux2: divorcio.nacionalidadAux2,
                    nacionalidadElla: divorcio.nacionalidadElla,
                    ofiCodigoRegElla: divorcio.ofiCodigoRegElla,
                    primerApellidoEl: divorcio.primerApellidoEl,
                    DIV_TIPO_DIVORCIO: divorcio.DIV_TIPO_DIVORCIO,
                    DIV_TRANSCRIPCION: divorcio.DIV_TRANSCRIPCION,
                    MAT_OFICIALIA_REG: divorcio.MAT_OFICIALIA_REG,
                    fechaModificacion: divorcio.fechaModificacion,
                    fechaNacimientoEl: divorcio.fechaNacimientoEl,
                    nacionalidadElTxt: divorcio.nacionalidadElTxt,
                    segundoApellidoEl: divorcio.segundoApellidoEl,
                    divResolucionAdmva: divorcio.divResolucionAdmva,
                    entidadCodigoRegEl: divorcio.entidadCodigoRegEl,
                    estadoRegNacNombre: divorcio.estadoRegNacNombre,
                    fechaRegActaMatDiv: divorcio.fechaRegActaMatDiv,
                    municipioNacNombre: divorcio.municipioNacNombre,
                    municipioRegNombre: divorcio.municipioRegNombre,
                    primerApellidoElla: divorcio.primerApellidoElla,
                    DIV_EDAD_DIVORCIADA: divorcio.DIV_EDAD_DIVORCIADA,
                    DIV_EDAD_DIVORCIADO: divorcio.DIV_EDAD_DIVORCIADO,
                    DIV_SEXO_DIVORCIADA: divorcio.DIV_SEXO_DIVORCIADA,
                    DIV_SEXO_DIVORCIADO: divorcio.DIV_SEXO_DIVORCIADO,
                    MAT_ACTA_NUMERO_REG: divorcio.MAT_ACTA_NUMERO_REG,
                    fechaNacimientoElla: divorcio.fechaNacimientoElla,
                    imaNombreHomologado: divorcio.imaNombreHomologado,
                    nacionalidadAux1Txt: divorcio.nacionalidadAux1Txt,
                    nacionalidadAux2Txt: divorcio.nacionalidadAux2Txt,
                    nacionalidadEllaTxt: divorcio.nacionalidadEllaTxt,
                    segundoApellidoElla: divorcio.segundoApellidoElla,
                    DIV_FECHA_RESOLUCION: divorcio.DIV_FECHA_RESOLUCION,
                    DIV_RESOLUCION_ADMVA: divorcio.DIV_RESOLUCION_ADMVA,
                    entidadCodigoRegElla: divorcio.entidadCodigoRegElla,
                    fechaNacimientoElTxt: divorcio.fechaNacimientoElTxt,
                    municipioCodigoRegEl: divorcio.municipioCodigoRegEl,
                    nombrePrimeraPersona: divorcio.nombrePrimeraPersona,
                    nombreSegundaPersona: divorcio.nombreSegundaPersona,
                    DIV_NOMBRE_DIVORCIADA: divorcio.DIV_NOMBRE_DIVORCIADA,
                    DIV_NOMBRE_DIVORCIADO: divorcio.DIV_NOMBRE_DIVORCIADO,
                    DIV_PRI_AP_DIVORCIADA: divorcio.DIV_PRI_AP_DIVORCIADA,
                    DIV_PRI_AP_DIVORCIADO: divorcio.DIV_PRI_AP_DIVORCIADO,
                    DIV_SEG_AP_DIVORCIADA: divorcio.DIV_SEG_AP_DIVORCIADA,
                    DIV_SEG_AP_DIVORCIADO: divorcio.DIV_SEG_AP_DIVORCIADO,
                    entidadCodigoRegElTxt: divorcio.entidadCodigoRegElTxt,
                    entidadCodigoRegistro: divorcio.entidadCodigoRegistro,
                    DIV_FECHA_MODIFICACION: divorcio.DIV_FECHA_MODIFICACION,
                    ENT_COD_NAC_DIVORCIADA: divorcio.ENT_COD_NAC_DIVORCIADA,
                    ENT_COD_NAC_DIVORCIADO: divorcio.ENT_COD_NAC_DIVORCIADO,
                    MAT_OFICIALIA_REG_DESC: divorcio.MAT_OFICIALIA_REG_DESC,
                    MUN_COD_NAC_DIVORCIADA: divorcio.MUN_COD_NAC_DIVORCIADA,
                    MUN_COD_NAC_DIVORCIADO: divorcio.MUN_COD_NAC_DIVORCIADO,
                    fechaNacimientoEllaTxt: divorcio.fechaNacimientoEllaTxt,
                    municipioCodigoRegElla: divorcio.municipioCodigoRegElla,
                    NAC_ANIO_REG_DIVORCIADA: divorcio.NAC_ANIO_REG_DIVORCIADA,
                    NAC_ANIO_REG_DIVORCIADO: divorcio.NAC_ANIO_REG_DIVORCIADO,
                    entidadCodigoRegEllaTxt: divorcio.entidadCodigoRegEllaTxt,
                    municipioCodigoRegistro: divorcio.municipioCodigoRegistro,
                    DIV_FECHA_NAC_DIVORCIADA: divorcio.DIV_FECHA_NAC_DIVORCIADA,
                    DIV_FECHA_NAC_DIVORCIADO: divorcio.DIV_FECHA_NAC_DIVORCIADO,
                    PAI_PAIS_NACI_DIVORCIADA: divorcio.PAI_PAIS_NACI_DIVORCIADA,
                    PAI_PAIS_NACI_DIVORCIADO: divorcio.PAI_PAIS_NACI_DIVORCIADO,
                    DIV_FEC_REG_NAC_DIVORCIADA:
                        divorcio.DIV_FEC_REG_NAC_DIVORCIADA,
                    DIV_FEC_REG_NAC_DIVORCIADO:
                        divorcio.DIV_FEC_REG_NAC_DIVORCIADO,
                    ENT_COD_NAC_DIVORCIADA_DESC:
                        divorcio.ENT_COD_NAC_DIVORCIADA_DESC,
                    ENT_COD_NAC_DIVORCIADO_DESC:
                        divorcio.ENT_COD_NAC_DIVORCIADO_DESC,
                    MUN_COD_NAC_DIVORCIADA_DESC:
                        divorcio.MUN_COD_NAC_DIVORCIADA_DESC,
                    MUN_COD_NAC_DIVORCIADO_DESC:
                        divorcio.MUN_COD_NAC_DIVORCIADO_DESC,
                    NAC_ACTA_BIS_REG_DIVORCIADA:
                        divorcio.NAC_ACTA_BIS_REG_DIVORCIADA,
                    NAC_ACTA_BIS_REG_DIVORCIADO:
                        divorcio.NAC_ACTA_BIS_REG_DIVORCIADO,
                    PAI_NACIONALIDAD_DIVORCIADA:
                        divorcio.PAI_NACIONALIDAD_DIVORCIADA,
                    PAI_NACIONALIDAD_DIVORCIADO:
                        divorcio.PAI_NACIONALIDAD_DIVORCIADO,
                    DIV_LOCALIDAD_NAC_DIVORCIADA:
                        divorcio.DIV_LOCALIDAD_NAC_DIVORCIADA,
                    DIV_LOCALIDAD_NAC_DIVORCIADO:
                        divorcio.DIV_LOCALIDAD_NAC_DIVORCIADO,
                    primerApellidoPrimeraPersona:
                        divorcio.primerApellidoPrimeraPersona,
                    primerApellidoSegundaPersona:
                        divorcio.primerApellidoSegundaPersona,
                    DIV_FEC_REG_ACTA_MAT_DIV_ADOS:
                        divorcio.DIV_FEC_REG_ACTA_MAT_DIV_ADOS,
                    NAC_ENT_CODIGO_REG_DIVORCIADA:
                        divorcio.NAC_ENT_CODIGO_REG_DIVORCIADA,
                    NAC_ENT_CODIGO_REG_DIVORCIADO:
                        divorcio.NAC_ENT_CODIGO_REG_DIVORCIADO,
                    NAC_MUN_CODIGO_REG_DIVORCIADA:
                        divorcio.NAC_MUN_CODIGO_REG_DIVORCIADA,
                    NAC_MUN_CODIGO_REG_DIVORCIADO:
                        divorcio.NAC_MUN_CODIGO_REG_DIVORCIADO,
                    NAC_OFI_CODIGO_REG_DIVORCIADA:
                        divorcio.NAC_OFI_CODIGO_REG_DIVORCIADA,
                    NAC_OFI_CODIGO_REG_DIVORCIADO:
                        divorcio.NAC_OFI_CODIGO_REG_DIVORCIADO,
                    PAI_PAIS_NACI_DIVORCIADA_DESC:
                        divorcio.PAI_PAIS_NACI_DIVORCIADA_DESC,
                    PAI_PAIS_NACI_DIVORCIADO_DESC:
                        divorcio.PAI_PAIS_NACI_DIVORCIADO_DESC,
                    segundoApellidoPrimeraPersona:
                        divorcio.segundoApellidoPrimeraPersona,
                    segundoApellidoSegundaPersona:
                        divorcio.segundoApellidoSegundaPersona,
                    NAC_ACTA_NUMERO_REG_DIVORCIADA:
                        divorcio.NAC_ACTA_NUMERO_REG_DIVORCIADA,
                    NAC_ACTA_NUMERO_REG_DIVORCIADO:
                        divorcio.NAC_ACTA_NUMERO_REG_DIVORCIADO,
                    PAI_NACIONALIDAD_DIVORCIADA_DESC:
                        divorcio.PAI_NACIONALIDAD_DIVORCIADA_DESC,
                    PAI_NACIONALIDAD_DIVORCIADO_DESC:
                        divorcio.PAI_NACIONALIDAD_DIVORCIADO_DESC,
                    NAC_ENT_CODIGO_REG_DIVORCIADA_DESC:
                        divorcio.NAC_ENT_CODIGO_REG_DIVORCIADA_DESC,
                    NAC_ENT_CODIGO_REG_DIVORCIADO_DESC:
                        divorcio.NAC_ENT_CODIGO_REG_DIVORCIADO_DESC,
                    NAC_MUN_CODIGO_REG_DIVORCIADA_DESC:
                        divorcio.NAC_MUN_CODIGO_REG_DIVORCIADA_DESC,
                    NAC_MUN_CODIGO_REG_DIVORCIADO_DESC:
                        divorcio.NAC_MUN_CODIGO_REG_DIVORCIADO_DESC,
                    NAC_OFI_CODIGO_REG_DIVORCIADA_DESC:
                        divorcio.NAC_OFI_CODIGO_REG_DIVORCIADA_DESC,
                    NAC_OFI_CODIGO_REG_DIVORCIADO_DESC:
                        divorcio.NAC_OFI_CODIGO_REG_DIVORCIADO_DESC,
                };
                await Divorcio.create(newActa);
                processedCount + console.log("AGREGE DIVORCIO");
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    skippedRecords.push(matrimonio.identificador_electronico);
                    console.log(
                        `Matrimonio con id ${iden} ya existe, omitiendo...`,
                    );
                } else {
                    throw error; // Propaga cualquier otro error que no sea de clave única
                }
            }
        }
        return processedCount;
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Error al obtener datos MATRIMONIO" });
    }
};

const Acta_adopcionPython = async (datosJson, iden, req, res) => {
    try {
        let processedCount = 0;
        for (const adoptado in datosJson.reconocimientos) {
            try {
                const newActa = {
                    identificador: iden,
                    ssa: adoptado.ssa,
                    curp: adoptado.curp,
                    foja: adoptado.foja,
                    pais: adoptado.pais,
                    sexo: adoptado.sexo,
                    tomo: adoptado.tomo,
                    folio: adoptado.folio,
                    libro: adoptado.libro,
                    madre: adoptado.madre,
                    padre: adoptado.padre,
                    sello: adoptado.sello,
                    cadena: adoptado.cadena,
                    noActa: adoptado.noActa,
                    nombre: adoptado.nombre,
                    actaBis: adoptado.actaBis,
                    paisTxt: adoptado.paisTxt,
                    IND_CURP: adoptado.IND_CURP,
                    REC_CRIP: adoptado.REC_CRIP,
                    REC_EDAD: adoptado.REC_EDAD,
                    curpAux1: adoptado.curpAux1,
                    curpAux2: adoptado.curpAux2,
                    nacMADRE: adoptado.nacMADRE,
                    nacPADRE: adoptado.nacPADRE,
                    curpMADRE: adoptado.curpMADRE,
                    curpPADRE: adoptado.curpPADRE,
                    estadoNac: adoptado.estadoNac,
                    estadoReg: adoptado.estadoReg,
                    localidad: adoptado.localidad,
                    municipio: adoptado.municipio,
                    oficialia: adoptado.oficialia,
                    numeroActa: adoptado.numeroActa,
                    valorMovim: adoptado.valorMovim,
                    codigoCivil: adoptado.codigoCivil,
                    identElectr: adoptado.identElectr,
                    tipoPersona: adoptado.tipoPersona,
                    anioRegistro: adoptado.anioRegistro,
                    municipioNac: adoptado.municipioNac,
                    municipioReg: adoptado.municipioReg,
                    nacionalidad: adoptado.nacionalidad,
                    REC_FECHA_ORI: adoptado.REC_FECHA_ORI,
                    fechaRegistro: adoptado.fechaRegistro,
                    transcripcion: adoptado.transcripcion,
                    REC_FECHA_ALTA: adoptado.REC_FECHA_ALTA,
                    primerApellido: adoptado.primerApellido,
                    IND_CURP_RECDOR: adoptado.IND_CURP_RECDOR,
                    REC_CAD_CAMBIOS: adoptado.REC_CAD_CAMBIOS,
                    REC_EDAD_RECDOR: adoptado.REC_EDAD_RECDOR,
                    REC_SEXO_RECDOR: adoptado.REC_SEXO_RECDOR,
                    estadoNacNombre: adoptado.estadoNacNombre,
                    estadoRegNombre: adoptado.estadoRegNombre,
                    fechaNacimiento: adoptado.fechaNacimiento,
                    municipioNombre: adoptado.municipioNombre,
                    nacionalidadTxt: adoptado.nacionalidadTxt,
                    notasMarginales: adoptado.notasMarginales,
                    oficialiaNombre: adoptado.oficialiaNombre,
                    segundoApellido: adoptado.segundoApellido,
                    sexoReconocedor: adoptado.sexoReconocedor,
                    REC_CLIP_CENTERA: adoptado.REC_CLIP_CENTERA,
                    REC_ERROR_ORIGEN: adoptado.REC_ERROR_ORIGEN,
                    REC_TIPO_PERSONA: adoptado.REC_TIPO_PERSONA,
                    nacionalidadAux1: adoptado.nacionalidadAux1,
                    nacionalidadAux2: adoptado.nacionalidadAux2,
                    FECHA_NACI_RECDOR: adoptado.FECHA_NACI_RECDOR,
                    OFI_CODIGO_RECDOR: adoptado.OFI_CODIGO_RECDOR,
                    REC_NOMBRE_RECDOR: adoptado.REC_NOMBRE_RECDOR,
                    REC_TRANSCRIPCION: adoptado.REC_TRANSCRIPCION,
                    estadoRegNacNombre: adoptado.estadoRegNacNombre,
                    municipioNacNombre: adoptado.municipioNacNombre,
                    municipioRegNombre: adoptado.municipioRegNombre,
                    NAC_ACTA_BIS_RECDOR: adoptado.NAC_ACTA_BIS_RECDOR,
                    NAC_ANIO_RECONOCIDO: adoptado.NAC_ANIO_RECONOCIDO,
                    NAC_ANIO_REG_RECDOR: adoptado.NAC_ANIO_REG_RECDOR,
                    REC_SEXO_RECONOCIDO: adoptado.REC_SEXO_RECONOCIDO,
                    nacionalidadAux1Txt: adoptado.nacionalidadAux1Txt,
                    nacionalidadAux2Txt: adoptado.nacionalidadAux2Txt,
                    NRC_TIENE_NACIMIENTO: adoptado.NRC_TIENE_NACIMIENTO,
                    REC_LOCALIDAD_RECDOR: adoptado.REC_LOCALIDAD_RECDOR,
                    REC_PRIMER_AP_RECDOR: adoptado.REC_PRIMER_AP_RECDOR,
                    nombrePrimeraPersona: adoptado.nombrePrimeraPersona,
                    nombreSegundaPersona: adoptado.nombreSegundaPersona,
                    ENT_CODIGO_NAC_RECDOR: adoptado.ENT_CODIGO_NAC_RECDOR,
                    ENT_CODIGO_REG_RECDOR: adoptado.ENT_CODIGO_REG_RECDOR,
                    FECHA_NACI_RECONOCIDO: adoptado.FECHA_NACI_RECONOCIDO,
                    FEC_NACI_PADRE_RECDOR: adoptado.FEC_NACI_PADRE_RECDOR,
                    IND_CURP_MADRE_RECDOR: adoptado.IND_CURP_MADRE_RECDOR,
                    IND_CURP_PADRE_RECDOR: adoptado.IND_CURP_PADRE_RECDOR,
                    MUN_CODIGO_NAC_RECDOR: adoptado.MUN_CODIGO_NAC_RECDOR,
                    MUN_CODIGO_REG_RECDOR: adoptado.MUN_CODIGO_REG_RECDOR,
                    OFI_CODIGO_RECONOCIDO: adoptado.OFI_CODIGO_RECONOCIDO,
                    REC_EDAD_MADRE_RECDOR: adoptado.REC_EDAD_MADRE_RECDOR,
                    REC_EDAD_PADRE_RECDOR: adoptado.REC_EDAD_PADRE_RECDOR,
                    REC_NOMBRE_RECONOCIDO: adoptado.REC_NOMBRE_RECONOCIDO,
                    REC_SEGUNDO_AP_RECDOR: adoptado.REC_SEGUNDO_AP_RECDOR,
                    REC_SEXO_MADRE_RECDOR: adoptado.REC_SEXO_MADRE_RECDOR,
                    REC_SEXO_PADRE_RECDOR: adoptado.REC_SEXO_PADRE_RECDOR,
                    NAC_ACTA_NUMERO_RECDOR: adoptado.NAC_ACTA_NUMERO_RECDOR,
                    OFI_CODIGO_RECDOR_DESC: adoptado.OFI_CODIGO_RECDOR_DESC,
                    PAI_CODIGO_PAIS_RECDOR: adoptado.PAI_CODIGO_PAIS_RECDOR,
                    REC_FECHA_MODIFICACION: adoptado.REC_FECHA_MODIFICACION,
                    FECHA_NACI_MADRE_RECDOR: adoptado.FECHA_NACI_MADRE_RECDOR,
                    NAC_ACTA_BIS_RECONOCIDO: adoptado.NAC_ACTA_BIS_RECONOCIDO,
                    OFI_CODIGO_MADRE_RECDOR: adoptado.OFI_CODIGO_MADRE_RECDOR,
                    OFI_CODIGO_PADRE_RECDOR: adoptado.OFI_CODIGO_PADRE_RECDOR,
                    PAI_NACIONALIDAD_RECDOR: adoptado.PAI_NACIONALIDAD_RECDOR,
                    REC_NOMBRE_MADRE_RECDOR: adoptado.REC_NOMBRE_MADRE_RECDOR,
                    REC_NOMBRE_PADRE_RECDOR: adoptado.REC_NOMBRE_PADRE_RECDOR,
                    REC_PRI_AP_MADRE_RECDOR: adoptado.REC_PRI_AP_MADRE_RECDOR,
                    REC_PRI_AP_PADRE_RECDOR: adoptado.REC_PRI_AP_PADRE_RECDOR,
                    REC_SEG_AP_MADRE_RECDOR: adoptado.REC_SEG_AP_MADRE_RECDOR,
                    REC_SEG_AP_PADRE_RECDOR: adoptado.REC_SEG_AP_PADRE_RECDOR,
                    NAC_LOCALIDAD_RECONOCIDO: adoptado.NAC_LOCALIDAD_RECONOCIDO,
                    REC_PRIMER_AP_RECONOCIDO: adoptado.REC_PRIMER_AP_RECONOCIDO,
                    ENT_CODIGO_NAC_RECONOCIDO:
                        adoptado.ENT_CODIGO_NAC_RECONOCIDO,
                    ENT_CODIGO_REG_RECONOCIDO:
                        adoptado.ENT_CODIGO_REG_RECONOCIDO,
                    FECHA_REG_NACI_RECONOCIDO:
                        adoptado.FECHA_REG_NACI_RECONOCIDO,
                    MUN_CODIGO_NAC_RECONOCIDO:
                        adoptado.MUN_CODIGO_NAC_RECONOCIDO,
                    MUN_CODIGO_REG_RECONOCIDO:
                        adoptado.MUN_CODIGO_REG_RECONOCIDO,
                    NAC_ACTA_BIS_MADRE_RECDOR:
                        adoptado.NAC_ACTA_BIS_MADRE_RECDOR,
                    NAC_ACTA_BIS_PADRE_RECDOR:
                        adoptado.NAC_ACTA_BIS_PADRE_RECDOR,
                    NAC_ANIO_REG_MADRE_RECDOR:
                        adoptado.NAC_ANIO_REG_MADRE_RECDOR,
                    NAC_ANIO_REG_PADRE_RECDOR:
                        adoptado.NAC_ANIO_REG_PADRE_RECDOR,
                    REC_SEGUNDO_AP_RECONOCIDO:
                        adoptado.REC_SEGUNDO_AP_RECONOCIDO,
                    ENT_CODIGO_NAC_RECDOR_DESC:
                        adoptado.ENT_CODIGO_NAC_RECDOR_DESC,
                    ENT_CODIGO_REG_RECDOR_DESC:
                        adoptado.ENT_CODIGO_REG_RECDOR_DESC,
                    MUN_CODIGO_NAC_RECDOR_DESC:
                        adoptado.MUN_CODIGO_NAC_RECDOR_DESC,
                    MUN_CODIGO_REG_RECDOR_DESC:
                        adoptado.MUN_CODIGO_REG_RECDOR_DESC,
                    NAC_ACTA_NUMERO_RECONOCIDO:
                        adoptado.NAC_ACTA_NUMERO_RECONOCIDO,
                    OFI_CODIGO_RECONOCIDO_DESC:
                        adoptado.OFI_CODIGO_RECONOCIDO_DESC,
                    PAI_CODIGO_PAIS_RECONOCIDO:
                        adoptado.PAI_CODIGO_PAIS_RECONOCIDO,
                    REC_LOCALIDAD_MADRE_RECDOR:
                        adoptado.REC_LOCALIDAD_MADRE_RECDOR,
                    REC_LOCALIDAD_PADRE_RECDOR:
                        adoptado.REC_LOCALIDAD_PADRE_RECDOR,
                    REC_LOCOCALIDAD_RECONOCIDO:
                        adoptado.REC_LOCOCALIDAD_RECONOCIDO,
                    entidadRegistroReconocedor:
                        adoptado.entidadRegistroReconocedor,
                    fechaNacimientoReconocedor:
                        adoptado.fechaNacimientoReconocedor,
                    ENT_CODIGO_NAC_MADRE_RECDOR:
                        adoptado.ENT_CODIGO_NAC_MADRE_RECDOR,
                    ENT_CODIGO_NAC_PADRE_RECDOR:
                        adoptado.ENT_CODIGO_NAC_PADRE_RECDOR,
                    ENT_CODIGO_REG_MADRE_RECDOR:
                        adoptado.ENT_CODIGO_REG_MADRE_RECDOR,
                    ENT_CODIGO_REG_PADRE_RECDOR:
                        adoptado.ENT_CODIGO_REG_PADRE_RECDOR,
                    MUN_CODIGO_NAC_MADRE_RECDOR:
                        adoptado.MUN_CODIGO_NAC_MADRE_RECDOR,
                    MUN_CODIGO_NAC_PADRE_RECDOR:
                        adoptado.MUN_CODIGO_NAC_PADRE_RECDOR,
                    MUN_CODIGO_REG_MADRE_RECDOR:
                        adoptado.MUN_CODIGO_REG_MADRE_RECDOR,
                    MUN_CODIGO_REG_PADRE_RECDOR:
                        adoptado.MUN_CODIGO_REG_PADRE_RECDOR,
                    PAI_CODIGO_PAIS_RECDOR_DESC:
                        adoptado.PAI_CODIGO_PAIS_RECDOR_DESC,
                    PAI_NACIONALIDAD_RECONOCIDO:
                        adoptado.PAI_NACIONALIDAD_RECONOCIDO,
                    REC_CURP_INFORMATIVA_RECIDO:
                        adoptado.REC_CURP_INFORMATIVA_RECIDO,
                    NAC_ACTA_NUMERO_MADRE_RECDOR:
                        adoptado.NAC_ACTA_NUMERO_MADRE_RECDOR,
                    NAC_ACTA_NUMERO_PADRE_RECDOR:
                        adoptado.NAC_ACTA_NUMERO_PADRE_RECDOR,
                    OFI_CODIGO_MADRE_RECDOR_DESC:
                        adoptado.OFI_CODIGO_MADRE_RECDOR_DESC,
                    OFI_CODIGO_PADRE_RECDOR_DESC:
                        adoptado.OFI_CODIGO_PADRE_RECDOR_DESC,
                    PAI_CODIGO_PAIS_MADRE_RECDOR:
                        adoptado.PAI_CODIGO_PAIS_MADRE_RECDOR,
                    PAI_CODIGO_PAIS_PADRE_RECDOR:
                        adoptado.PAI_CODIGO_PAIS_PADRE_RECDOR,
                    PAI_NACIONALIDAD_RECDOR_DESC:
                        adoptado.PAI_NACIONALIDAD_RECDOR_DESC,
                    primerApellidoPrimeraPersona:
                        adoptado.primerApellidoPrimeraPersona,
                    primerApellidoSegundaPersona:
                        adoptado.primerApellidoSegundaPersona,
                    PAI_NACIONALIDAD_MADRE_RECDOR:
                        adoptado.PAI_NACIONALIDAD_MADRE_RECDOR,
                    PAI_NACIONALIDAD_PADRE_RECDOR:
                        adoptado.PAI_NACIONALIDAD_PADRE_RECDOR,
                    segundoApellidoPrimeraPersona:
                        adoptado.segundoApellidoPrimeraPersona,
                    segundoApellidoSegundaPersona:
                        adoptado.segundoApellidoSegundaPersona,
                    ENT_CODIGO_NAC_RECONOCIDO_DESC:
                        adoptado.ENT_CODIGO_NAC_RECONOCIDO_DESC,
                    ENT_CODIGO_REG_RECONOCIDO_DESC:
                        adoptado.ENT_CODIGO_REG_RECONOCIDO_DESC,
                    MUN_CODIGO_NAC_RECONOCIDO_DESC:
                        adoptado.MUN_CODIGO_NAC_RECONOCIDO_DESC,
                    MUN_CODIGO_REG_RECONOCIDO_DESC:
                        adoptado.MUN_CODIGO_REG_RECONOCIDO_DESC,
                    PAI_CODIGO_PAIS_RECONOCIDO_DESC:
                        adoptado.PAI_CODIGO_PAIS_RECONOCIDO_DESC,
                    ENT_CODIGO_NAC_MADRE_RECDOR_DESC:
                        adoptado.ENT_CODIGO_NAC_MADRE_RECDOR_DESC,
                    ENT_CODIGO_NAC_PADRE_RECDOR_DESC:
                        adoptado.ENT_CODIGO_NAC_PADRE_RECDOR_DESC,
                    ENT_CODIGO_REG_MADRE_RECDOR_DESC:
                        adoptado.ENT_CODIGO_REG_MADRE_RECDOR_DESC,
                    ENT_CODIGO_REG_PADRE_RECDOR_DESC:
                        adoptado.ENT_CODIGO_REG_PADRE_RECDOR_DESC,
                    MUN_CODIGO_NAC_MADRE_RECDOR_DESC:
                        adoptado.MUN_CODIGO_NAC_MADRE_RECDOR_DESC,
                    MUN_CODIGO_NAC_PADRE_RECDOR_DESC:
                        adoptado.MUN_CODIGO_NAC_PADRE_RECDOR_DESC,
                    MUN_CODIGO_REG_MADRE_RECDOR_DESC:
                        adoptado.MUN_CODIGO_REG_MADRE_RECDOR_DESC,
                    MUN_CODIGO_REG_PADRE_RECDOR_DESC:
                        adoptado.MUN_CODIGO_REG_PADRE_RECDOR_DESC,
                    PAI_NACIONALIDAD_RECONOCIDO_DESC:
                        adoptado.PAI_NACIONALIDAD_RECONOCIDO_DESC,
                    PAI_CODIGO_PAIS_MADRE_RECDOR_DESC:
                        adoptado.PAI_CODIGO_PAIS_MADRE_RECDOR_DESC,
                    PAI_CODIGO_PAIS_PADRE_RECDOR_DESC:
                        adoptado.PAI_CODIGO_PAIS_PADRE_RECDOR_DESC,
                    PAI_NACIONALIDAD_MADRE_RECDOR_DESC:
                        adoptado.PAI_NACIONALIDAD_MADRE_RECDOR_DESC,
                    PAI_NACIONALIDAD_PADRE_RECDOR_DESC:
                        adoptado.PAI_NACIONALIDAD_PADRE_RECDOR_DESC,
                };
                await Reconocimiento.create(newActa);
                processedCount++;
                console.log("ADOPCION");
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    skippedRecords.push(matrimonio.identificador_electronico);
                    console.log(
                        `Matrimonio con id ${iden} ya existe, omitiendo...`,
                    );
                } else {
                    throw error; // Propaga cualquier otro error que no sea de clave única
                }
            }
        }
        return processedCount;
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Error al obtener datos MATRIMONIO" });
    }
};
