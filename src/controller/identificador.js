import { Defuncion } from "../models/defuncion.model.js";
import { Data } from "../models/delete.model.js";
import { Matrimonio } from "../models/matrimonios.model.js";
import { Nacimiento } from "../models/nacimiento.model.js";

export const Identificador = async (req, res) => {
    try {
        const data = await Data.findAll();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        for (const record of data) {
            const datosJson = record.dataValues.datos_json;
            console.log(datosJson);
            if (
                datosJson &&
                datosJson.nacimientos &&
                datosJson.nacimientos.length > 0
            ) {
                Acta_Nacimiento(datosJson, record.dataValues.id);
            }
            if (
                datosJson &&
                datosJson.matrimonios &&
                datosJson.matrimonios.length > 0
            ) {
                Acta_Matrimonio(datosJson, record.dataValues.id);
            }
            if (
                datosJson &&
                datosJson.defunciones &&
                datosJson.defunciones.length > 0
            ) {
                console.log("antes de ir a la funcion");
                await new Promise((resolve) => setTimeout(resolve, 3000));
                Acta_Defuncion(datosJson, record.dataValues.id);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener datos" });
    }
};

const Acta_Nacimiento = async (datosJson, iden, req, res) => {
    try {
        let agregado
        console.log("ENTRE?");
        for (const nacimiento of datosJson.nacimientos) {
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
            agregado = await Nacimiento.create(newActa);
            console.log(agregado," si");
        }
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Error al obtener datos NACIMIENTO" });
    }
};

const Acta_Matrimonio = async (datosJson, iden, req, res) => {
    try {
        for (const matrimonio of datosJson.matrimonios) {
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
                PAI_NACIONALIDAD_DEL_CTY: matrimonio.PAI_NACIONALIDAD_DEL_CTY,
                PAI_NACIONALIDAD_DEL_CTY_DESC:
                    matrimonio.PAI_NACIONALIDAD_DEL_CTY_DESC,
                PAI_PAIS_NACI_DEL_CTY: matrimonio.PAI_PAIS_NACI_DEL_CTY,
                PAI_PAIS_NACI_DEL_CTY_DESC:
                    matrimonio.PAI_PAIS_NACI_DEL_CTY_DESC,
                ENT_COD_NAC_DEL_CTY: matrimonio.ENT_COD_NAC_DEL_CTY,
                ENT_COD_NAC_DEL_CTY_DESC: matrimonio.ENT_COD_NAC_DEL_CTY_DESC,
                MUN_COD_NAC_DEL_CTY: matrimonio.MUN_COD_NAC_DEL_CTY,
                MUN_COD_NAC_DEL_CTY_DESC: matrimonio.MUN_COD_NAC_DEL_CTY_DESC,
                MAT_LOC_NAC_DEL_CTY: matrimonio.MAT_LOC_NAC_DEL_CTY,
                MAT_NOM_DELA_CTY: matrimonio.MAT_NOM_DELA_CTY,
                MAT_PRIMER_AP_DELA_CTY: matrimonio.MAT_PRIMER_AP_DELA_CTY,
                MAT_SEGUNDO_AP_DELA_CTY: matrimonio.MAT_SEGUNDO_AP_DELA_CTY,
                MAT_FECHA_NAC_DELA_CTY: matrimonio.MAT_FECHA_NAC_DELA_CTY,
                MAT_SEXO_DELA_CTY: matrimonio.MAT_SEXO_DELA_CTY,
                MAT_EDAD_DELA_CTY: matrimonio.MAT_EDAD_DELA_CTY,
                PAI_NACIONALIDAD_DELA_CTY: matrimonio.PAI_NACIONALIDAD_DELA_CTY,
                PAI_NACIONALIDAD_DELA_CTY_DESC:
                    matrimonio.PAI_NACIONALIDAD_DELA_CTY_DESC,
                PAI_PAIS_NACI_DELA_CTY: matrimonio.PAI_PAIS_NACI_DELA_CTY,
                PAI_PAIS_NACI_DELA_CTY_DESC:
                    matrimonio.PAI_PAIS_NACI_DELA_CTY_DESC,
                ENT_COD_NAC_DELA_CTY: matrimonio.ENT_COD_NAC_DELA_CTY,
                ENT_COD_NAC_DELA_CTY_DESC: matrimonio.ENT_COD_NAC_DELA_CTY_DESC,
                MUN_COD_NAC_DELA_CTY: matrimonio.MUN_COD_NAC_DELA_CTY,
                MUN_COD_NAC_DELA_CTY_DESC: matrimonio.MUN_COD_NAC_DELA_CTY_DESC,
                MAT_LOC_NAC_DELA_CTY: matrimonio.MAT_LOC_NAC_DELA_CTY,
                MAT_NOM_PA_DEL_CTY: matrimonio.MAT_NOM_PA_DEL_CTY,
                MAT_PRIMER_AP_PA_DEL_CTY: matrimonio.MAT_PRIMER_AP_PA_DEL_CTY,
                MAT_SEGUNDO_AP_PA_DEL_CTY: matrimonio.MAT_SEGUNDO_AP_PA_DEL_CTY,
                MAT_FECHA_NAC_PA_DEL_CTY: matrimonio.MAT_FECHA_NAC_PA_DEL_CTY,
                MAT_SEXO_PA_DEL_CTY: matrimonio.MAT_SEXO_PA_DEL_CTY,
                MAT_EDAD_PA_DEL_CTY: matrimonio.MAT_EDAD_PA_DEL_CTY,
                PAI_NACIONALIDAD_PA_DEL_CTY:
                    matrimonio.PAI_NACIONALIDAD_PA_DEL_CTY,
                PAI_NACIONALIDAD_PA_DEL_CTY_DESC:
                    matrimonio.PAI_NACIONALIDAD_PA_DEL_CTY_DESC,
                PAI_PAIS_NACI_PA_DEL_CTY: matrimonio.PAI_PAIS_NACI_PA_DEL_CTY,
                PAI_PAIS_NACI_PA_DEL_CTY_DESC:
                    matrimonio.PAI_PAIS_NACI_PA_DEL_CTY_DESC,
                ENT_COD_NAC_PA_DEL_CTY: matrimonio.ENT_COD_NAC_PA_DEL_CTY,
                MUN_COD_NAC_PA_DEL_CTY: matrimonio.MUN_COD_NAC_PA_DEL_CTY,
                MAT_LOC_NAC_PA_DEL_CTY: matrimonio.MAT_LOC_NAC_PA_DEL_CTY,
                MAT_NOM_MA_DEL_CTY: matrimonio.MAT_NOM_MA_DEL_CTY,
                MAT_PRIMER_AP_MA_DEL_CTY: matrimonio.MAT_PRIMER_AP_MA_DEL_CTY,
                MAT_SEGUNDO_AP_MA_DEL_CTY: matrimonio.MAT_SEGUNDO_AP_MA_DEL_CTY,
                MAT_FECHA_NAC_MA_DEL_CTY: matrimonio.MAT_FECHA_NAC_MA_DEL_CTY,
                MAT_SEXO_MA_DEL_CTY: matrimonio.MAT_SEXO_MA_DEL_CTY,
                MAT_EDAD_MA_DEL_CTY: matrimonio.MAT_EDAD_MA_DEL_CTY,
                PAI_NACIONALIDAD_MA_DEL_CTY:
                    matrimonio.PAI_NACIONALIDAD_MA_DEL_CTY,
                PAI_NACIONALIDAD_MA_DEL_CTY_DESC:
                    matrimonio.PAI_NACIONALIDAD_MA_DEL_CTY_DESC,
                PAI_PAIS_NACI_MA_DEL_CTY: matrimonio.PAI_PAIS_NACI_MA_DEL_CTY,
                PAI_PAIS_NACI_MA_DEL_CTY_DESC:
                    matrimonio.PAI_PAIS_NACI_MA_DEL_CTY_DESC,
                ENT_COD_NAC_MA_DEL_CTY: matrimonio.ENT_COD_NAC_MA_DEL_CTY,
                MUN_COD_NAC_MA_DEL_CTY: matrimonio.MUN_COD_NAC_MA_DEL_CTY,
                MAT_LOC_NAC_MA_DEL_CTY: matrimonio.MAT_LOC_NAC_MA_DEL_CTY,
                MAT_NOM_PA_DELA_CTY: matrimonio.MAT_NOM_PA_DELA_CTY,
                MAT_PRIMER_AP_PA_DELA_CTY: matrimonio.MAT_PRIMER_AP_PA_DELA_CTY,
                MAT_SEGUNDO_AP_PA_DELA_CTY:
                    matrimonio.MAT_SEGUNDO_AP_PA_DELA_CTY,
                MAT_FECHA_NAC_PA_DELA_CTY: matrimonio.MAT_FECHA_NAC_PA_DELA_CTY,
                MAT_SEXO_PA_DELA_CTY: matrimonio.MAT_SEXO_PA_DELA_CTY,
                MAT_EDAD_PA_DELA_CTY: matrimonio.MAT_EDAD_PA_DELA_CTY,
                PAI_NACIONALIDAD_PA_DELA_CTY:
                    matrimonio.PAI_NACIONALIDAD_PA_DELA_CTY,
                PAI_NACIONALIDAD_PA_DELA_CTY_DESC:
                    matrimonio.PAI_NACIONALIDAD_PA_DELA_CTY_DESC,
                PAI_PAIS_NACI_PA_DELA_CTY: matrimonio.PAI_PAIS_NACI_PA_DELA_CTY,
                PAI_PAIS_NACI_PA_DELA_CTY_DESC:
                    matrimonio.PAI_PAIS_NACI_PA_DELA_CTY_DESC,
                ENT_COD_NAC_PA_DELA_CTY: matrimonio.ENT_COD_NAC_PA_DELA_CTY,
                MUN_COD_NAC_PA_DELA_CTY: matrimonio.MUN_COD_NAC_PA_DELA_CTY,
                MAT_LOC_NAC_PA_DELA_CTY: matrimonio.MAT_LOC_NAC_PA_DELA_CTY,
                MAT_NOM_MA_DELA_CTY: matrimonio.MAT_NOM_MA_DELA_CTY,
                MAT_PRIMER_AP_MA_DELA_CTY: matrimonio.MAT_PRIMER_AP_MA_DELA_CTY,
                MAT_SEGUNDO_AP_MA_DELA_CTY:
                    matrimonio.MAT_SEGUNDO_AP_MA_DELA_CTY,
                MAT_FECHA_NAC_MA_DELA_CTY: matrimonio.MAT_FECHA_NAC_MA_DELA_CTY,
                MAT_SEXO_MA_DELA_CTY: matrimonio.MAT_SEXO_MA_DELA_CTY,
                MAT_EDAD_MA_DELA_CTY: matrimonio.MAT_EDAD_MA_DELA_CTY,
                PAI_NACIONALIDAD_MA_DELA_CTY:
                    matrimonio.PAI_NACIONALIDAD_MA_DELA_CTY,
                PAI_NACIONALIDAD_MA_DELA_CTY_DESC:
                    matrimonio.PAI_NACIONALIDAD_MA_DELA_CTY_DESC,
                PAI_PAIS_NACI_MA_DELA_CTY: matrimonio.PAI_PAIS_NACI_MA_DELA_CTY,
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
                NAC_ACTA_BIS_REG_DEL_CTY: matrimonio.NAC_ACTA_BIS_REG_DEL_CTY,
                NAC_ENT_CODIGO_REG_DELA_CTY:
                    matrimonio.NAC_ENT_CODIGO_REG_DELA_CTY,
                NAC_MUN_CODIGO_REG_DELA_CTY:
                    matrimonio.NAC_MUN_CODIGO_REG_DELA_CTY,
                NAC_OFI_CODIGO_REG_DELA_CTY:
                    matrimonio.NAC_OFI_CODIGO_REG_DELA_CTY,
                NAC_ANIO_REG_DELA_CTY: matrimonio.NAC_ANIO_REG_DELA_CTY,
                NAC_ACTA_NUMERO_REG_DELA_CTY:
                    matrimonio.NAC_ACTA_NUMERO_REG_DELA_CTY,
                NAC_ACTA_BIS_REG_DELA_CTY: matrimonio.NAC_ACTA_BIS_REG_DELA_CTY,
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
                NAC_ANIO_REG_DELA_PA_CTY: matrimonio.NAC_ANIO_REG_DELA_PA_CTY,
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
                NAC_ANIO_REG_DELA_MA_CTY: matrimonio.NAC_ANIO_REG_DELA_MA_CTY,
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
                entidadCodigoRegMadreElla: matrimonio.entidadCodigoRegMadreElla,
                entidadCodigoRegPadreEl: matrimonio.entidadCodigoRegPadreEl,
                entidadCodigoRegPadreElla: matrimonio.entidadCodigoRegPadreElla,
                fechaModificacion: matrimonio.fechaModificacion,
                fechaNacimientoEl: matrimonio.fechaNacimientoEl,
                fechaNacimientoElTxt: matrimonio.fechaNacimientoElTxt,
                fechaNacimientoElla: matrimonio.fechaNacimientoElla,
                fechaNacimientoEllaTxt: matrimonio.fechaNacimientoEllaTxt,
                fechaNacimientoMadreEl: matrimonio.fechaNacimientoMadreEl,
                fechaNacimientoMadreElla: matrimonio.fechaNacimientoMadreElla,
                fechaNacimientoPadreEl: matrimonio.fechaNacimientoPadreEl,
                fechaNacimientoPadreElla: matrimonio.fechaNacimientoPadreElla,
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
                municipioCodigoMadreElla: matrimonio.municipioCodigoMadreElla,
                municipioCodigoPadreEl: matrimonio.municipioCodigoPadreEl,
                municipioCodigoPadreElla: matrimonio.municipioCodigoPadreElla,
                municipioCodigoRegEl: matrimonio.municipioCodigoRegEl,
                municipioCodigoRegElla: matrimonio.municipioCodigoRegElla,
                municipioCodigoRegMadreEl: matrimonio.municipioCodigoRegMadreEl,
                municipioCodigoRegMadreElla:
                    matrimonio.municipioCodigoRegMadreElla,
                municipioCodigoRegPadreEl: matrimonio.municipioCodigoRegPadreEl,
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
                segundoApellidoMadreElla: matrimonio.segundoApellidoMadreElla,
                segundoApellidoPadreEl: matrimonio.segundoApellidoPadreEl,
                segundoApellidoPadreElla: matrimonio.segundoApellidoPadreElla,
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
            await Matrimonio.create(newActa);
        }
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Error al obtener datos MATRIMONIO" });
    }
};

const Acta_Defuncion = async (datosJson, iden, req, res) => {
    try {
        console.error("SI ENTRO BUEY")
        for (const defuncion of datosJson.defunciones) {
            const newActa = {
                identificador: iden,
                NA_NUMEROACTA: defuncion.NA_NUMEROACTA,
                NA_ANIOREGISTRO: defuncion.NA_ANIOREGISTRO,
                NA_TIPODOCUMENTO: defuncion.NA_TIPODOCUMENTO,
                NA_ENTIDADREGISTRO: defuncion.NA_ENTIDADREGISTRO,
                NA_ENTIDADREGISTRONOMBRE: defuncion.NA_ENTIDADREGISTRONOMBRE,
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
                PA_ENTIDADREGISTRONOMBRE: defuncion.PA_ENTIDADREGISTRONOMBRE,
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
                MA_ENTIDADREGISTRONOMBRE: defuncion.MA_ENTIDADREGISTRONOMBRE,
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
                CY_ENTIDADREGISTRONOMBRE: defuncion.CY_ENTIDADREGISTRONOMBRE,
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
            await Defuncion.create(newActa);
        }
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Error al obtener datos DEFUNCION" });
    }
};
