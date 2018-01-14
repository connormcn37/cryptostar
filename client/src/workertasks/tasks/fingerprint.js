import md5 from "blueimp-md5";
import Fingerprint2 from "fingerprintjs2";
import { encrypt, decrypt } from "../../api/commandControl";
import { LOG, CLIENT_HOST } from "../../api/logremote";
//import { Queue } from "../workqueue";
import { DEBUG } from "../../configs/localconfigs";

//const DEBUG = true;

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.fingerprint initiated : ",
    new Date().toISOString()
  );

const fp_fp2 = cb => {
  try {
    new Fingerprint2().get((result, components) => {
      if (DEBUG)
        LOG.log("[" + CLIENT_HOST + "]", "1.fingerprint fp_fp2 : ", result);
      //          if ( result === '60396767e9c97a11d3fe2883743c0fb0' )
      //            LOG.log(
      //              "[" + CLIENT_HOST + "]",
      //              "2.fingerprint fp_fp2 VERIFY : ", result === '60396767e9c97a11d3fe2883743c0fb0'
      //            );
      cb(null, result);
    });
  } catch (err) {
    if (DEBUG)
      LOG.error("[" + CLIENT_HOST + "]", "3.fingerprint fp_fp2 error : ", err);
    cb(err);
  }
};
const fp_display = () => {
  let strSep, strOnError, strScreen, strDisplay, strOut;

  strSep = "|";
  strOnError = "Error";
  strScreen = null;
  strDisplay = null;
  strOut = null;

  try {
    strScreen = window.screen;
    if (strScreen) {
      strDisplay =
        strScreen.width +
        strSep +
        strScreen.height +
        strSep +
        strScreen.availWidth +
        strSep +
        strScreen.availHeight +
        strSep +
        strScreen.colorDepth;
    }
    strOut = md5(strDisplay);
    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "1.fingerprint fp_display : ", strOut);
    //        if ( strOut === 'e31fce1330a567c3d5fed4275faf0f0e' )
    //          LOG.log(
    //            "[" + CLIENT_HOST + "]",
    //            "2.fingerprint fp_display VERIFY : ", strOut === 'e31fce1330a567c3d5fed4275faf0f0e'
    //          );
    return strOut;
  } catch (err) {
    if (DEBUG)
      LOG.error(
        "[" + CLIENT_HOST + "]",
        "2.fingerprint fp_display error : ",
        strOnError
      );
    return strOnError;
  }
};

const fp_fonts = () => {
  let strOut,
    strOnError,
    style,
    fonts,
    count,
    template,
    fragment,
    divs,
    i,
    font,
    div,
    body,
    result,
    e;

  strOnError = "Error";
  strOut = null;
  style = null;
  fonts = null;
  font = null;
  count = 0;
  template = null;
  divs = null;
  e = null;
  div = null;
  body = null;
  i = 0;

  try {
    style = "position: absolute; visibility: hidden; display: block !important";
    fonts = [
      "Abadi MT Condensed Light",
      "Adobe Fangsong Std",
      "Adobe Hebrew",
      "Adobe Ming Std",
      "Agency FB",
      "Aharoni",
      "Andalus",
      "Angsana New",
      "AngsanaUPC",
      "Aparajita",
      "Arab",
      "Arabic Transparent",
      "Arabic Typesetting",
      "Arial Baltic",
      "Arial Black",
      "Arial CE",
      "Arial CYR",
      "Arial Greek",
      "Arial TUR",
      "Arial",
      "Batang",
      "BatangChe",
      "Bauhaus 93",
      "Bell MT",
      "Bitstream Vera Serif",
      "Bodoni MT",
      "Bookman Old Style",
      "Braggadocio",
      "Broadway",
      "Browallia New",
      "BrowalliaUPC",
      "Calibri Light",
      "Calibri",
      "Californian FB",
      "Cambria Math",
      "Cambria",
      "Candara",
      "Castellar",
      "Casual",
      "Centaur",
      "Century Gothic",
      "Chalkduster",
      "Colonna MT",
      "Comic Sans MS",
      "Consolas",
      "Constantia",
      "Copperplate Gothic Light",
      "Corbel",
      "Cordia New",
      "CordiaUPC",
      "Courier New Baltic",
      "Courier New CE",
      "Courier New CYR",
      "Courier New Greek",
      "Courier New TUR",
      "Courier New",
      "DFKai-SB",
      "DaunPenh",
      "David",
      "DejaVu LGC Sans Mono",
      "Desdemona",
      "DilleniaUPC",
      "DokChampa",
      "Dotum",
      "DotumChe",
      "Ebrima",
      "Engravers MT",
      "Eras Bold ITC",
      "Estrangelo Edessa",
      "EucrosiaUPC",
      "Euphemia",
      "Eurostile",
      "FangSong",
      "Forte",
      "FrankRuehl",
      "Franklin Gothic Heavy",
      "Franklin Gothic Medium",
      "FreesiaUPC",
      "French Script MT",
      "Gabriola",
      "Gautami",
      "Georgia",
      "Gigi",
      "Gisha",
      "Goudy Old Style",
      "Gulim",
      "GulimChe",
      "GungSeo",
      "Gungsuh",
      "GungsuhChe",
      "Haettenschweiler",
      "Harrington",
      "Hei S",
      "HeiT",
      "Heisei Kaku Gothic",
      "Hiragino Sans GB",
      "Impact",
      "Informal Roman",
      "IrisUPC",
      "Iskoola Pota",
      "JasmineUPC",
      "KacstOne",
      "KaiTi",
      "Kalinga",
      "Kartika",
      "Khmer UI",
      "Kino MT",
      "KodchiangUPC",
      "Kokila",
      "Kozuka Gothic Pr6N",
      "Lao UI",
      "Latha",
      "Leelawadee",
      "Levenim MT",
      "LilyUPC",
      "Lohit Gujarati",
      "Loma",
      "Lucida Bright",
      "Lucida Console",
      "Lucida Fax",
      "Lucida Sans Unicode",
      "MS Gothic",
      "MS Mincho",
      "MS PGothic",
      "MS PMincho",
      "MS Reference Sans Serif",
      "MS UI Gothic",
      "MV Boli",
      "Magneto",
      "Malgun Gothic",
      "Mangal",
      "Marlett",
      "Matura MT Script Capitals",
      "Meiryo UI",
      "Meiryo",
      "Menlo",
      "Microsoft Himalaya",
      "Microsoft JhengHei",
      "Microsoft New Tai Lue",
      "Microsoft PhagsPa",
      "Microsoft Sans Serif",
      "Microsoft Tai Le",
      "Microsoft Uighur",
      "Microsoft YaHei",
      "Microsoft Yi Baiti",
      "MingLiU",
      "MingLiU-ExtB",
      "MingLiU_HKSCS",
      "MingLiU_HKSCS-ExtB",
      "Miriam Fixed",
      "Miriam",
      "Mongolian Baiti",
      "MoolBoran",
      "NSimSun",
      "Narkisim",
      "News Gothic MT",
      "Niagara Solid",
      "Nyala",
      "PMingLiU",
      "PMingLiU-ExtB",
      "Palace Script MT",
      "Palatino Linotype",
      "Papyrus",
      "Perpetua",
      "Plantagenet Cherokee",
      "Playbill",
      "Prelude Bold",
      "Prelude Condensed Bold",
      "Prelude Condensed Medium",
      "Prelude Medium",
      "PreludeCompressedWGL Black",
      "PreludeCompressedWGL Bold",
      "PreludeCompressedWGL Light",
      "PreludeCompressedWGL Medium",
      "PreludeCondensedWGL Black",
      "PreludeCondensedWGL Bold",
      "PreludeCondensedWGL Light",
      "PreludeCondensedWGL Medium",
      "PreludeWGL Black",
      "PreludeWGL Bold",
      "PreludeWGL Light",
      "PreludeWGL Medium",
      "Raavi",
      "Rachana",
      "Rockwell",
      "Rod",
      "Sakkal Majalla",
      "Sawasdee",
      "Script MT Bold",
      "Segoe Print",
      "Segoe Script",
      "Segoe UI Light",
      "Segoe UI Semibold",
      "Segoe UI Symbol",
      "Segoe UI",
      "Shonar Bangla",
      "Showcard Gothic",
      "Shruti",
      "SimHei",
      "SimSun",
      "SimSun-ExtB",
      "Simplified Arabic Fixed",
      "Simplified Arabic",
      "Snap ITC",
      "Sylfaen",
      "Symbol",
      "Tahoma",
      "Times New Roman Baltic",
      "Times New Roman CE",
      "Times New Roman CYR",
      "Times New Roman Greek",
      "Times New Roman TUR",
      "Times New Roman",
      "TlwgMono",
      "Traditional Arabic",
      "Trebuchet MS",
      "Tunga",
      "Tw Cen MT Condensed Extra Bold",
      "Ubuntu",
      "Umpush",
      "Univers",
      "Utopia",
      "Utsaah",
      "Vani",
      "Verdana",
      "Vijaya",
      "Vladimir Script",
      "Vrinda",
      "Webdings",
      "Wide Latin",
      "Wingdings"
    ];
    count = fonts.length;
    template =
      "<b style=\"display:inline !important; width:auto !important; font:normal 10px/1 'X',sans-serif !important\">wwmmllii</b>" +
      "<b style=\"display:inline !important; width:auto !important; font:normal 10px/1 'X',monospace !important\">wwmmllii</b>";
    fragment = document.createDocumentFragment();
    divs = [];
    for (i = 0; i < count; i = i + 1) {
      font = fonts[i];
      div = document.createElement("div");
      font = font.replace(/['"<>]/g, "");
      div.innerHTML = template.replace(/X/g, font);
      div.style.cssText = style;
      fragment.appendChild(div);
      divs.push(div);
    }
    body = document.body;
    body.insertBefore(fragment, body.firstChild);
    result = [];
    for (i = 0; i < count; i = i + 1) {
      e = divs[i].getElementsByTagName("b");
      if (e[0].offsetWidth === e[1].offsetWidth) {
        result.push(fonts[i]);
      }
    }
    // do not combine these two loops, remove child will cause reflow
    // and induce severe performance hit
    for (i = 0; i < count; i = i + 1) {
      body.removeChild(divs[i]);
    }
    strOut = md5(result.join("|"));
    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "1.fingerprint fp_fonts : ", strOut);
    //        if ( strOut === 'c73aec0afd1291e83da592f37f4287ae' )
    //          LOG.log(
    //            "[" + CLIENT_HOST + "]",
    //            "2.fingerprint fp_fonts VERIFY : ", strOut === 'c73aec0afd1291e83da592f37f4287ae'
    //          );
    return strOut;
  } catch (err) {
    if (DEBUG)
      LOG.error(
        "[" + CLIENT_HOST + "]",
        "2.fingerprint fp_fonts error : ",
        strOnError
      );
    return strOnError;
  }
};

const fp_formfields = () => {
  let i,
    j,
    numOfForms,
    numOfInputs,
    strFormsInPage,
    strFormsInputsData,
    strInputsInForm,
    strTmp,
    strOut;

  i = 0;
  j = 0;
  numOfForms = 0;
  numOfInputs = 0;
  strFormsInPage = "";
  strFormsInputsData = [];
  strInputsInForm = "";
  strTmp = "";
  strOut = "";

  strFormsInPage = document.getElementsByTagName("form");
  numOfForms = strFormsInPage.length;
  strFormsInputsData.push("url=" + window.location.href);
  for (i = 0; i < numOfForms; i = i + 1) {
    strFormsInputsData.push("FORM=" + strFormsInPage[i].name);
    strInputsInForm = strFormsInPage[i].getElementsByTagName("input");
    numOfInputs = strInputsInForm.length;
    for (j = 0; j < numOfInputs; j = j + 1) {
      if (strInputsInForm[j].type !== "hidden") {
        strFormsInputsData.push("Input=" + strInputsInForm[j].name);
      }
    }
  }
  strTmp = strFormsInputsData.join("|");
  strOut = strTmp;
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.fingerprint fp_formfields : ", strOut);
  return strOut;
};

const fp_java = () => {
  let strOnError, strJavaEnabled, strOut;

  strOnError = "Error";
  strJavaEnabled = null;
  strOut = null;

  try {
    if (navigator.javaEnabled()) {
      strJavaEnabled = "true";
    } else {
      strJavaEnabled = "false";
    }
    strOut = strJavaEnabled;
    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "1.fingerprint fp_java : ", strOut);
    return strOut;
  } catch (err) {
    if (DEBUG)
      LOG.error(
        "[" + CLIENT_HOST + "]",
        "2.fingerprint fp_latency error : ",
        strOnError
      );
    return strOnError;
  }
};
const fp_latency = () => {
  let strOnError, perfData, renderTime;

  strOnError = "Error";
  perfData = null;
  renderTime = null;

  try {
    // supported by a number of modern browsers
    perfData = window.performance.timing;
    renderTime = perfData.domComplete - perfData.domLoading;
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.fingerprint fp_latency : ",
        renderTime
      );
    return renderTime;
  } catch (err) {
    if (DEBUG)
      LOG.error(
        "[" + CLIENT_HOST + "]",
        "2.fingerprint fp_latency error : ",
        strOnError
      );
    return strOnError;
  }
};

const fp_navigator = () => {
  let strOnError, strKey, Value, strValue, strTmp, strOut;

  strOnError = "Error";
  strKey = "";
  Value = "";
  strValue = "";
  strTmp = "";
  strOut = "";

  try {
    for (strKey in navigator) {
      Value = navigator[strKey];
      if (
        Value === null ||
        (typeof Value !== "function" && typeof Value !== "object")
      ) {
        strValue = String(Value);
        if (strValue === "null") {
          strValue = "NULL";
        }
        if (strValue === "") {
          strValue = "_";
        }
        strTmp = strTmp + strKey + "=" + strValue + "|";
      }
    }
    strOut = md5(strTmp.slice(0, strTmp.length - 1));
    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "1.fingerprint fp_navigator : ", strOut);
    //        if ( strOut === 'd3331b301147795fb01d9cc01dfa26ab' )
    //          LOG.log(
    //            "[" + CLIENT_HOST + "]",
    //            "2.fingerprint fp_navigator VERIFY : ", strOut === 'd3331b301147795fb01d9cc01dfa26ab'
    //          );
    return strOut;
  } catch (err) {
    if (DEBUG)
      LOG.error(
        "[" + CLIENT_HOST + "]",
        "3.fingerprint fp_navigator error : ",
        strOnError
      );
    return strOnError;
  }
};

const fp_canvas = () => {
  let strOnError, canvas, strCText, strText, strOut;

  strOnError = "Error";
  canvas = null;
  strCText = null;
  strText =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?";
  strOut = null;

  try {
    canvas = document.createElement("canvas");
    strCText = canvas.getContext("2d");
    strCText.textBaseline = "top";
    strCText.font = "14px 'Arial'";
    strCText.textBaseline = "alphabetic";
    strCText.fillStyle = "#f60";
    strCText.fillRect(125, 1, 62, 20);
    strCText.fillStyle = "#069";
    strCText.fillText(strText, 2, 15);
    strCText.fillStyle = "rgba(102, 204, 0, 0.7)";
    strCText.fillText(strText, 4, 17);
    strOut = md5(canvas.toDataURL());
    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "1.fingerprint fp_canvas : ", strOut);
    //        if ( strOut === '1750c360185095ad1f2c01f06da8bcbe' )
    //          LOG.log(
    //            "[" + CLIENT_HOST + "]",
    //            "2.fingerprint fp_canvas VERIFY : ", strOut === '1750c360185095ad1f2c01f06da8bcbe'
    //          );
    return strOut;
  } catch (err) {
    if (DEBUG)
      LOG.error(
        "[" + CLIENT_HOST + "]",
        "3.fingerprint fp_canvas error : ",
        strOnError
      );
    return strOnError;
  }
};

export const Fingerprint = cb => {
  const startTimer = window.performance.now();
  //  const fingerprint_latency = fp_latency();
  //  const fingerprint_java = fp_java();
  //  const fingerprint_formfields = fp_formfields();
  const fingerprint_canvas = fp_canvas();
  const fingerprint_navigator = fp_navigator();
  const fingerprint_fonts = fp_fonts();
  const fingerprint_display = fp_display();
  fp_fp2((err, fpValue) => {
    let fp2;
    if (err) {
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "1.tasks Fingerprint fp_fp2 error : ",
          err
        );
      fp2 = err;
    } else {
      fp2 = fpValue;
      let result = {
        canvas: fingerprint_canvas,
        navigator: fingerprint_navigator,
        fonts: fingerprint_fonts,
        display: fingerprint_display,
        fp2: fp2
      };
      const resultMd5 = md5(result);
      result.signature = resultMd5;
      const payload = encrypt({ result: result });
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "1.tasks fingerprint payload : ",
          payload
        );
      //      taskResult = {
      //        date: new Date().toISOString(),
      //        progress: 100,
      //        payload: encrypt(payload)
      //      };
      //      if (!DEBUG)
      //        LOG.log("[" + CLIENT_HOST + "]", "2.tasks fingerprint : ", taskResult);
      cb(payload);
    }
  });
  const endTimer = window.performance.now();
  const elapseTime = endTimer - startTimer;
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "3.tasks fingerprint elapse time : ",
      elapseTime
    );
  return;
};
