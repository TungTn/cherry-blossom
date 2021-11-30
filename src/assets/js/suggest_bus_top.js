/*****
 * IT'S WILLER TRAVEL BUS SEARCH WIDGET Version 1.0.0
 *
 * @dependency jQuery version 1.9.1 +
 * @dependency bootstrap 3.0.0 +
 * @dependency Datepicker for Bootstrap v1.6.4 +
 *
 *
 ****/
if (typeof $ == "undefined") { console.log("need jQuery"); }
let $wbs = $;
const FROM_PREFECTURE_TEXT_ELEMENT_ID = '#fromPrefectureText';
const FROM_PREFECTURE_ID_ELEMENT_ID = '#fromPrefectureId';
const FROM_PREFECTURE_PARAM_ELEMENT_ID = '#fromPrefectureParam';
const TO_PREFECTURE_TEXT_ELEMENT_ID = '#toPrefectureText';
const TO_PREFECTURE_ID_ELEMENT_ID = '#toPrefectureId';
const TO_PREFECTURE_PARAM_ELEMENT_ID = '#toPrefectureParam';
const TO_AREA_PARAM_ELEMENT_ID = '#toAreaParam';
const ROOT_NAME = "#wbs_parts";

const conflict = !compareVersions($wbs.fn.jquery, ">=", "1.9.1");
const data_root = $wbs(ROOT_NAME);
const force_mode = $wbs("#wbs_mode", data_root).val() || "";

// GETăƒ‘ăƒ©ăƒ¡ăƒ¼ă‚¿ă®ăƒ‡ăƒ¼ă‚¿ăŒå­˜åœ¨ă—ăªă„å ´åˆă¯ă€HTMLă®ăƒ‘ăƒ©ăƒ¡ăƒ¼ă‚¿ă‹ă‚‰æƒ…å ±ă‚’å–å¾—ă™ă‚‹ă€‚
const query_params = getParams();
const def_lang = typeof query_params["lang"] != "undefined" ? query_params["lang"] : $wbs("#wbs_lang", data_root).val() || "ja";

let file_lang = def_lang;
if(def_lang == 'tw' || def_lang == 'cn'){
		file_lang = 'zh_TW';
}else if(def_lang == 'vn' ||  def_lang == 'th'){
		file_lang = 'en';
}

const wbs_default_from_pref = typeof query_params["sk"] != "undefined" ? query_params["sk"] : $wbs("#wbs_default_from_pref").val() || "";
const wbs_default_to_pref = typeof query_params["tk"] != "undefined" ? query_params["tk"] : $wbs("#wbs_default_to_pref").val() || "";
const wbs_default_trip = typeof query_params["of"] != "undefined" ? query_params["of"] : $wbs("#wbs_default_trip").val() || "";
const wbs_default_bp = typeof query_params["fp"] != "undefined" ? query_params["fp"] : $wbs("#fp").val() || "0";

let history_ids = { "dep": [], "arr": [] };
let master_datas = {};
let arrival_datas = {};
let arrive_pref_lists = [];

(function (e) {
  $(function () {
    $.ajaxSetup({
      cache: true
    });
    // settings_test.jsă§kenFromToMapă§å¿…è¦ăªkenFromToMap_en.jsă®å‘¼ă³å‡ºă—å…ƒă‚’æŒ‡å®ă—ă¦ă„ă‚‹ă€‚
    // ăƒ‡ăƒ¼ă‚¿ăƒ•ă‚¡ă‚¤ăƒ«ă¯è‡ªå‹•å‡ºå›ăªă®ă§ă€travelHomeå´ă«ă‚ă‚‹ă®ă§æ³¨æ„ă€‚
    $.when(
      requestJquery(),
      $.getScript('/stc/3/js/bus_search/' + def_lang + '/suggest_bus_top_setting.js')
    ).done(function () {
      $.when(
        $.getScript(wbs_default_bp === "0" ? PREF_MAPPING_URL : BP_PREF_MAPPING_URL),
        $.getScript('//cdn.willer.co.jp/static/js/bootstrap.min.js')
      ).done(function () {
        if (conflict) {
          $wbs = $.noConflict(true);
        }
        $.when(
          $.getScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js'),
          $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js'),
          $.getScript('//cdn.willer.co.jp/static/js/bootstrap-datepicker.min.js')
        ).done(function () {
          $.when(
            getHistoryIds(),
            $.getJSON('/cache/search/3/suggest/suggest_dictionary_' + file_lang + '.json'),
            $.getJSON('/cache/search/3/suggest/suggest_arrival_' + file_lang + '.json'),
            $.getScript('//cdn.willer.co.jp/static/js/bootstrap-datepicker.willer.js')
          ).done(function (history_json, suggest_dict_json, suggest_arrival_json) {
            // å±¥æ­´å¯¾è±¡IDă‚’æ½å‡ºă™ă‚‹ă€‚
            history_ids = history_json;
            // çœŒă‚¨ăƒªă‚¢ăƒªă‚¹ăƒˆăƒ‡ăƒ¼ă‚¿
            master_datas = suggest_dict_json[0];
            // åˆ°ç€ă‚¨ăƒªă‚¢ăƒªă‚¹ăƒˆăƒ‡ăƒ¼ă‚¿
            arrival_datas = suggest_arrival_json[0];
            // ăƒăƒ¼ă‚¸è¡¨ç¤ºç”¨ă®ăƒ‡ăƒ•ă‚©ăƒ«ăƒˆæ–‡è¨€ăă‚ˆă³ă‚³ăƒ³ăƒ†ăƒ³ăƒ„ă®è¨­å®ă‚’è¡Œă†ă€‚
            defaultSet();
            if (wbs_default_from_pref == "" && wbs_default_to_pref == "" && wbs_default_trip == "") {
              setLTData();
            }
            data_root.show();
          }).fail(function (e3) { console.log(e3); })
        })
      }).fail(function (e2) {
        console.log(e2);
        console.log("Not read setting file.");
      });
    }).fail(function (e1) {
      console.log(e1);
      console.log("Not read langage file.");
    });

    // ç‰‡é“ă€å¾€å¾©ă®ăƒœă‚¿ăƒ³è¨­å®ă‚’è¡Œă†
    setTripType();
    // æ­ä¹—äººæ•°ă®ăƒœă‚¿ăƒ³ă‚¢ă‚¯ă‚·ăƒ§ăƒ³è¨­å®
    setNumberOfPassengers();

    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[From]ă®åˆ¶å¾¡
    // ă‚¤ăƒ™ăƒ³ăƒˆç™ºç”Ÿé †ă¯ă€focus â†’ (keyup) â†’ box-suggest_from.mousedown â†’ blur
    $(FROM_PREFECTURE_TEXT_ELEMENT_ID, data_root).on("focus", function () {
      hidePulldownMenu();
      showSuggest("dep", $(".box-suggest_from ul", data_root), $(this).val(), $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val(), "");
      $(".box-suggest_from", data_root).show();
      // ăƒ•ă‚©ăƒ¼ă‚«ă‚¹ăŒå¤–ă‚ŒăŸæ™‚ă®å¯¾å¿œ
    }).on("blur", function (e1) {
      // é¸æç¢ºå®ă—ă¦ă„ăªă„å ´åˆă¯ă€å…¥å›ä¸­ă®ăƒ‡ăƒ¼ă‚¿ă‚’ă‚¯ăƒªă‚¢ă™ă‚‹
      if ($(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val() == "") {
        $(FROM_PREFECTURE_TEXT_ELEMENT_ID + ', ' + FROM_PREFECTURE_PARAM_ELEMENT_ID
          + ', ' + TO_PREFECTURE_TEXT_ELEMENT_ID + ', ' + TO_PREFECTURE_ID_ELEMENT_ID
          + ', ' + TO_PREFECTURE_PARAM_ELEMENT_ID + ', ' + TO_AREA_PARAM_ELEMENT_ID, data_root).val('');
      } else {
        // ä¸­é€”åç«¯ă«å…¥å›ă•ă‚Œă¦ă„ă‚‹ă“ă¨ă‚’è€ƒæ…®ă—ă¦å¾©å…ƒ
        $(FROM_PREFECTURE_TEXT_ELEMENT_ID, data_root).val(getMasterData("prefs", $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val().split("-")[1]).name);
      }
      hidePulldownMenu();
    }).on("keyup", function (e3) {
      keyupCommonProcess(e3, $(".box-suggest_from ul", data_root), $(this).val());
    })
    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]ă®åˆ¶å¾¡
    $(TO_PREFECTURE_TEXT_ELEMENT_ID, data_root).on("focus", function () {
      hidePulldownMenu();
      $(this).select();
      showSuggest("arr", $(".box-suggest_to ul", data_root), $(this).val()
        , $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val(), $(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val());
      $(".box-suggest_to", data_root).show();
      // ăƒ•ă‚©ăƒ¼ă‚«ă‚¹ăŒå¤–ă‚ŒăŸæ™‚ă®å¯¾å¿œ
    }).on("blur", function (e1) {
      // é¸æç¢ºå®ă—ă¦ă„ăªă„å ´åˆă¯ă€å…¥å›ä¸­ă®ăƒ‡ăƒ¼ă‚¿ă‚’ă‚¯ăƒªă‚¢ă™ă‚‹
      if ($(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val() == "") {
        $(TO_PREFECTURE_TEXT_ELEMENT_ID + ', ' + TO_PREFECTURE_ID_ELEMENT_ID
          + ', ' + TO_PREFECTURE_PARAM_ELEMENT_ID + ', ' + TO_AREA_PARAM_ELEMENT_ID, data_root).val('');
      } else {
        const arr_select_id = $(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val().split("-");
        let to_prefecture_text;
        if (arr_select_id[0] == 'areas') {
          const area = getMasterData("areas", arr_select_id[1]);
          const pref = getMasterData("prefs", area["pref_code"]);
          to_prefecture_text = area.name + " - " + pref.name;
        } else {
          const pref = getMasterData("prefs", arr_select_id[1]);
          to_prefecture_text = pref.name;
        }
        // ä¸­é€”åç«¯ă«å…¥å›ă•ă‚Œă¦ă„ă‚‹ă“ă¨ă‚’è€ƒæ…®ă—ă¦å¾©å…ƒ
        $(TO_PREFECTURE_TEXT_ELEMENT_ID, data_root).val(to_prefecture_text);
      }
      ga("send", "event", "bus_search_pref_arr", "no_match", $(this).val(), 1);
      hidePulldownMenu();
    }).on("keyup", function (e3) {
      keyupCommonProcess(e3, $(".box-suggest_to ul", data_root), $(this).val()
        , $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val());
    })

    /**
     * Common process for keyup.
     * @param {*} event 
     * @param {*} elm 
     * @param {*} input_val 
     * @param {*} from_selected_id 
     */
    function keyupCommonProcess(event, elm, input_val, from_selected_id) {
      const KEY_CODE_ENTER = 13;
      const KEY_CODE_UP = 38;
      const KEY_CODE_DOWN = 40;
      const is_elm_visible = elm.is(":visible");
      const pref_elms = elm.find("li.result");
      const pref_elms_active_length = pref_elms.filter(".active").length;

      if (event.keyCode == KEY_CODE_ENTER && is_elm_visible && pref_elms.length > 0) {
        // ă€ŒENTERă€key
        if (pref_elms_active_length > 0) {
          pref_elms.filter(".active").eq(0).mousedown();
        }
      } else if (event.keyCode == KEY_CODE_UP && is_elm_visible && pref_elms.length > 0) {
        // ă€Œâ†‘ă€key
        let next = 0;
        if (pref_elms_active_length > 0) {
          const idx = pref_elms.index(pref_elms.filter(".active").eq(0));
          if (idx != 0) {
            next = idx - 1;
          } else {
            next = pref_elms.length - 1;
          }
        }
        pref_elms.removeClass("active").eq(next).addClass("active");
      } else if (event.keyCode == KEY_CODE_DOWN && is_elm_visible && pref_elms.length > 0) {
        // ă€Œâ†“ă€key
        let next = 0;
        if (pref_elms_active_length > 0) {
          const idx = pref_elms.index(pref_elms.filter(".active").eq(0));
          if (idx != pref_elms.length - 1) {
            next = idx + 1;
          }
        }
        pref_elms.removeClass("active").eq(next).addClass("active");
      } else {
        if (from_selected_id) {
          $(".box-suggest_to", data_root).show();
          showSuggest("arr", elm, input_val, from_selected_id);
        } else {
          $(".box-suggest_from", data_root).show();
          showSuggest("dep", elm, input_val);
        }
      }
    }

    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[From]ă®åˆ¶å¾¡
    $(".box-suggest_from", data_root).on("mousedown", "li.result", function () {
      const input_val = $(FROM_PREFECTURE_TEXT_ELEMENT_ID, data_root).val();
      // é¸æă—ăŸé …ç›®ă®data-idă‚’å–å¾—ă™ă‚‹ă€‚
      const select_id = $(this).find("span.pref_name").attr("data-id");
      const arr_select_id = select_id.split("-");
      // é¸æă—ăŸé …ç›®ă®æƒ…å ±ă‚’å–å¾—ă™ă‚‹ă€‚
      const pref = getMasterData("prefs", arr_select_id[1]);
      // å–å¾—ă—ăŸæƒ…å ±ă®IDă‚’è¨­å®ă™ă‚‹ă€‚
      $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val(select_id);
      // å–å¾—ă—ăŸæƒ…å ±ă®åç§°ă‚’è¨­å®ă™ă‚‹ă€‚
      $(FROM_PREFECTURE_TEXT_ELEMENT_ID, data_root).val(pref["name"]);
      // éƒ½é“åºœçœŒă®paramă‚’è¨­å®
      $(FROM_PREFECTURE_PARAM_ELEMENT_ID, data_root).val(pref.param);
      // å–å¾—ă—ăŸæƒ…å ±ă‚’Fromå´ă®å±¥æ­´ă«ä¿ç®¡ă™ă‚‹ă€‚
      setHistoryIds("dep", input_val, select_id);
      $(".box-suggest_from", data_root).hide();
    }).on("mousedown", "li.suggest-title", function () {
      return false;
    })

    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]ă®åˆ¶å¾¡
    $(".box-suggest_to", data_root).on("mousedown", "li.result", function () {
      const input_val = $(TO_PREFECTURE_TEXT_ELEMENT_ID, data_root).val();
      const select_id = $(this).find("span.pref_name").attr("data-id");
      const arr_select_id = select_id.split("-");
      let pref, to_prefecture_text, area_param;
      // é¸æă—ăŸé …ç›®ăŒçœŒăƒ‡ăƒ¼ă‚¿ă®æ™‚
      if (arr_select_id[0] == "prefs") {
        pref = getMasterData("prefs", arr_select_id[1]);
        area_param = '';
        to_prefecture_text = pref["name"];
      }
      // é¸æă—ăŸé …ç›®ăŒă‚¨ăƒªă‚¢ăƒ‡ăƒ¼ă‚¿ă®æ™‚
      if (arr_select_id[0] == "areas") {
        const area = getMasterData("areas", arr_select_id[1]);
        area_param = area.param;
        pref = getMasterData("prefs", area["pref_code"]);
        to_prefecture_text = area["name"] + " - " + pref["name"];
      }
      // å–å¾—ă—ăŸæƒ…å ±ă®IDă‚’è¨­å®ă™ă‚‹ă€‚
      $(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val(select_id);
      // å–å¾—ă—ăŸæƒ…å ±ă®åç§°ă‚’è¨­å®ă™ă‚‹ă€‚
      $(TO_PREFECTURE_TEXT_ELEMENT_ID, data_root).val(to_prefecture_text);
      // éƒ½é“åºœçœŒă®paramă‚’è¨­å®
      $(TO_PREFECTURE_PARAM_ELEMENT_ID, data_root).val(pref.param);
      // ă‚¨ăƒªă‚¢ă®paramă‚’è¨­å®
      $(TO_AREA_PARAM_ELEMENT_ID, data_root).val(area_param);
      // å–å¾—ă—ăŸæƒ…å ±ă‚’Toå´ă®å±¥æ­´ă«ä¿ç®¡ă™ă‚‹ă€‚
      setHistoryIds("arr", input_val, select_id);
      $(".box-suggest_to", data_root).hide();
    }).on("mousedown", "li.suggest-title", function () {
      return false;
    })

    $("#btn-search", data_root).on("click", function () {
      if (!checkParams()) {
        return false;
      }
      let next_params = {
        "skb": $("#skb", data_root).val() || "02",
        "sk": $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val(),
        "tk": $(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val(),
        "osf": $("#osf", data_root).val() || "1",
        "osfp": $("#osfp", data_root).val() || "0",
        "of": $("input[name='roundtripFlg']:checked", data_root).val() || "",
        "sa": $("#sa", data_root).val() || "",
        "ta": $("#ta", data_root).val() || "",
        "sdt": moment($("#departureDate", data_root).val(), DEF_CAL_FORMAT.toUpperCase()).format("YYYYMMDD") || "",
        "fdt": $("input[name='roundtripFlg']:checked", data_root).val() == 1 ? moment($("#returnDate", data_root).val(), DEF_CAL_FORMAT.toUpperCase()).format("YYYYMMDD") : "",
        "mn": $("#adultMaleCount", data_root).val() || "0",
        "fn": $("#adultFemaleCount", data_root).val() || "0",
        "fp": $("#fp", data_root).val() || "",
        "aid": $("#aid", data_root).val() || query_params.aid || '',
        "mid": $("#mid", data_root).val() || query_params.mid || '',
        "fid": $("#fid", data_root).val() || query_params.fid || '',
        "agencyCode": $("#agencyCode", data_root).val() || query_params.agencyCode || '',
        "ca": $("#ca", data_root).val() || "",
        "kkf": $("#kkf", data_root).val() || ""
      }
      if ($.inArray(def_lang, ["vn", "th"]) > -1) {
        next_params.lang = "en";
      } else if (def_lang == "tw" || def_lang == "cn") {
        next_params.lang = "zh_TW";
      } else {
        next_params.lang = def_lang;
      }
      setLTCookie(next_params);
      location.href = getSearchPath() + getQueryParameters(next_params);
      return false;
    });
    /**
     * æ¤œç´¢URLă®ç”Ÿæˆ
     */
    function getSearchPath() {
      return '/' + getViewLang()
        + '/bus_search/'
        + $(FROM_PREFECTURE_PARAM_ELEMENT_ID).val()
        + '/all/'
        + $(TO_PREFECTURE_PARAM_ELEMENT_ID).val()
        + '/' + ($(TO_AREA_PARAM_ELEMENT_ID).val() ? $(TO_AREA_PARAM_ELEMENT_ID).val() : 'all') + '/'
        + getSearchDateFormat($('#departureDate', data_root).val()) + '/';
    }
    /**
     * è¨€èªă‚’å–å¾—
     */
    function getViewLang() {
      if ($.inArray(def_lang, ["vn", "th"]) > -1) {
        return "en";
      } else if (def_lang === "cn") {
        return "tw";
      }
      return def_lang;
    }
    /**
     * æ—¥ä»˜å–å¾—
     */
    function getSearchDateFormat(tempDate) {
      let searchDate = 'ym_' + moment(tempDate, DEF_CAL_FORMAT.toUpperCase()).format('YYYYMM');
      if (tempDate.length >= 8) {
        searchDate += '/day_' + moment(tempDate, DEF_CAL_FORMAT.toUpperCase()).format('DD');
      }
      return searchDate;
    }
    
    /**
     * ă‚¯ă‚¨ăƒªăƒ‘ăƒ©ăƒ¡ăƒ¼ă‚¿å–å¾—
     */
    function getQueryParameters(next_params) {
      const queryParameters = [];
      if (next_params.mn) {
        queryParameters.push('stockNumberMale=' + next_params.mn);
      }
      if (next_params.fn) {
        queryParameters.push('stockNumberFemale=' + next_params.fn);
      }
      if (query_params.aid) {
        queryParameters.push('aid=' + query_params.aid);
      }
      if (query_params.mid) {
        queryParameters.push('mid=' + query_params.mid);
      }
      if (query_params.fid) {
        queryParameters.push('fid=' + query_params.fid);
      }
      if (query_params.agencyCode) {
        queryParameters.push('agencyCode=' + query_params.agencyCode);
      }
      if (queryParameters.length <= 0) {
        return '';
      }
      return '?' + queryParameters.reduce(function (acc, currentVal) {
        return acc + '&' + currentVal;
      });
    }
  })
})($wbs)

function compareVersions(v1, comparator, v2) {
  const temp_comparator = comparator == '=' ? '==' : comparator;
  if (['==', '===', '<', '<=', '>', '>=', '!=', '!=='].indexOf(temp_comparator) == -1) {
    throw new Error('Invalid comparator. ' + temp_comparator);
  }
  const v1parts = v1.split('.'), v2parts = v2.split('.');
  const maxLen = Math.max(v1parts.length, v2parts.length);
  let part1, part2;
  let cmp = 0;
  for (let i = 0; i < maxLen && !cmp; i++) {
    part1 = parseInt(v1parts[i], 10) || 0;
    part2 = parseInt(v2parts[i], 10) || 0;
    if (part1 < part2)
      cmp = 1;
    if (part1 > part2)
      cmp = -1;
  }
  return eval('0' + comparator + cmp);
}

/**
 *  getParams
 *  GETăƒ‘ăƒ©ăƒ¡ăƒ¼ă‚¿ă‹ă‚‰ă®ăƒ‡ăƒ¼ă‚¿å–å¾—ăƒ¡ă‚½ăƒƒăƒ‰
 *
 *  @return array params_array
 */
function getParams() {
  const parameters = decodeURIComponent(location.search).split("?");
  if (parameters.length == 1) {
    return "";
  }
  const tmp_params = parameters[1].split("&");
  let params_array = [];

  for (let i = 0; i < tmp_params.length; i++) {
    let neet = tmp_params[i].split("=");
    if (neet.length == 2 && neet[1] != "") {
      params_array[h(neet[0])] = escapeHTML(neet[1]);
    }
  }
  return params_array;
}
function h(s) {
	return s.replace(/[&'`"<>]/g, function(match) {
		return {
			'&': '&amp;',
			"'": '&#x27;',
			'`': '&#x60;',
			'"': '&quot;',
			'<': '&lt;',
			'>': '&gt;',
		}[match]
	});
}

/**
 *  requestJquery
 *  Jqueryå‘¼ă³å‡ºă—å‡¦ç†
 *
 *  @param ăªă—
 *
 *  @return object Jqueryå‘¼ă³å‡ºă—
 */
function requestJquery() {
  if (conflict) {
    return $.getScript('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', function () {
      $.ajaxSetup({
        cache: true
      });
    });
  }
  let deferred = $.Deferred();
  deferred.resolve();
  return deferred.promise();
}

/**
 *  getMasterData
 *  çœŒă‚¨ăƒªă‚¢ăƒªă‚¹ăƒˆăƒ‡ăƒ¼ă‚¿ă®å–å¾—
 *
 *  @param str id çœŒă‚¨ăƒªă‚¢ăƒªă‚¹ăƒˆă‚³ăƒ¼ăƒ‰
 *
 *  @return dict obj çœŒă‚¨ăƒªă‚¢ăƒªă‚¹ăƒˆăƒ‡ăƒ¼ă‚¿
 */
function getMasterData(category, id) {
  try {
    let obj;
    // çœŒăƒªă‚¹ăƒˆå–å¾—
    if (category === "prefs") {
      obj = master_datas["prefs"][id];
      obj["pref_code"] = id;
    }
    // ă‚¨ăƒªă‚¢ăƒªă‚¹ăƒˆå–å¾—
    if (category === "areas") {
      obj = master_datas["areas"][id];
    }
    // ăƒ©ăƒ³ăƒ‰ăƒăƒ¼ă‚¯ăƒªă‚¹ăƒˆå–å¾—
    if (category === "landmarks") {
      obj = master_datas["landmarks"][id];
    }
    return obj;
  } catch (e) {
    console.log("getMasterData_error", e);
  }
}

/**
 *  getHistoryList
 *  å±¥æ­´ăƒªă‚¹ăƒˆăƒ‡ăƒ¼ă‚¿ă®å–å¾—
 *
 *  @param str way å¯¾è±¡æ–¹å‘(Fromï¼depă€Toï¼arr)
 *  @param str reg_str å…¥å›æ–‡å­—
 *  @param obj target_elm å‡ºå›HTML
 *  @param str from_selected_id ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§é¸ææ¸ˆă®ID(From)
 *
 *  @return ăªă—
 */
function getHistoryList(way, reg_str, target_elm, from_selected_id) {
  try {
    if (reg_str == "" && typeof history_ids[way] != "undefined" && history_ids[way].length > 0) {
      $.each(history_ids[way], function (index, id) {
        const arr_id = id.split("-");
        let pref, area, dsp_name, search_id1, search_id2, pref_param, area_param;
        // å±¥æ­´ăƒ‡ăƒ¼ă‚¿ăŒçœŒăƒ‡ăƒ¼ă‚¿ă®æ™‚
        if (arr_id[0] == "prefs") {
          pref = getMasterData("prefs", arr_id[1]);
          pref_param = pref.param;
          area_param = '';
          dsp_name = escapeHTML(pref["name"]);
          search_id1 = arr_id[1];
          search_id2 = "";
        }
        // å±¥æ­´ăƒ‡ăƒ¼ă‚¿ăŒă‚¨ăƒªă‚¢ăƒ‡ăƒ¼ă‚¿ă®æ™‚
        if (arr_id[0] == "areas") {
          area = getMasterData("areas", arr_id[1]);
          pref = getMasterData("prefs", area["pref_code"]);
          pref_param = pref.param;
          area_param = area.param;
          dsp_name = escapeHTML(area["name"]) + "<span style='color:#a9a9a9;'> - " + escapeHTML(pref["name"]) + "</span>";
          search_id1 = area["pref_code"];
          search_id2 = arr_id[1];
        }

        // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[FROM]å´ă®åˆ¶å¾¡ă‹ă¤é¸æä¸å¯ă®çœŒă¯ă‚¹ă‚­ăƒƒăƒ—
        if (way == "dep" && !isSelectableDeparture(search_id1)) {
          return true;
        }
        // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]å´ă®åˆ¶å¾¡ă‹ă¤åˆ°ç€ă‚¨ăƒªă‚¢ăƒ‡ăƒ¼ă‚¿ă«å­˜åœ¨ă™ă‚‹æ™‚
        if (way == "arr" && isArrivalList(from_selected_id, search_id1, search_id2) == false) {
          return true;
        }
        target_elm.append(createSuggestLi('result-history', id, dsp_name, pref_param, area_param));
      })
    }
  } catch (e) {
    console.log("getHistoryList_error =>", e);
  }
}

/**
 *  getPopularList
 *  ăƒăƒ”ăƒ¥ăƒ©ăƒ¼ăƒªă‚¹ăƒˆă®è¨­å®
 *
 *  @param str way å¯¾è±¡æ–¹å‘(Fromï¼depă€Toï¼arr)
 *  @param str reg_str å…¥å›æ–‡å­—
 *  @param obj target_elm å‡ºå›HTML
 *  @param str from_selecetd_id ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§é¸ææ¸ˆă®ID(From)
 *
 *  @return ăªă—
 */
function getPopularList(way, reg_str, target_elm, from_selected_id) {
  try {
    if (way == "arr" && (typeof from_selected_id == "undefined" || from_selected_id == "")) {
      return;
    }
    if (reg_str == "") {
      $.each(master_datas["popular_nos"], function (index, obj) {
        const main_data = getMasterData(obj["category"], obj["code"]);
        if (!main_data) {
          return;
        }
        // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[FROM]å´ă®åˆ¶å¾¡ă‹ă¤é¸æä¸å¯ă®çœŒă¯ă‚¹ă‚­ăƒƒăƒ—
        if (way == "dep" && !isSelectableDeparture(main_data["pref_code"])) {
          return true;
        }
        // Toă‚’è¡¨ç¤ºă™ă‚‹é›ă€ăƒăƒ”ăƒ¥ăƒ©ăƒ¼ăƒªă‚¹ăƒˆă«è¨­å®ă—ă¦ă‚ă£ă¦ă‚‚ă€åˆ°ç€ă‚¨ăƒªă‚¢ăƒ‡ăƒ¼ă‚¿ă«ç„¡ă„å ´åˆă¯è¡¨ç¤ºă—ăªă„ă€‚
        if (way == "arr" && isArrivalList(from_selected_id, main_data["pref_code"], main_data["area_code"]) == false) {
          return true;
        }
        let data_id_prefix = "prefs-";
        let data_id = main_data["pref_code"];
        // çœŒăƒ‡ăƒ¼ă‚¿ă®æ™‚
        if (obj["category"] == "prefs") {
          const dsp_name = main_data["name"];
          target_elm.append(
            createSuggestLi('result-popular', data_id_prefix + data_id, escapeHTML(dsp_name), main_data.param, ''));
        }
        // ă‚¨ăƒªă‚¢ăƒ‡ăƒ¼ă‚¿ă¯ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]ă®æ™‚ă®ă¿è¡¨ç¤ºă™ă‚‹ă€‚
        if (way == "arr" && obj["category"] == "areas") {
          const pref_data = getMasterData("prefs", main_data["pref_code"]);
          data_id_prefix = "areas-";
          data_id = obj["code"];
          const dsp_name = escapeHTML(main_data["name"]) + "<span style='color:#a9a9a9;'> - " + escapeHTML(pref_data["name"]) + "</span>";
          target_elm.append(
            createSuggestLi('result-popular', data_id_prefix + data_id, dsp_name, pref_data.param, main_data.param));
        }
        // ăƒ©ăƒ³ăƒ‰ăƒăƒ¼ă‚¯ăƒ‡ăƒ¼ă‚¿ă¯ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]ă®æ™‚ă®ă¿è¡¨ç¤ºă™ă‚‹ă€‚
        if (way == "arr" && obj["category"] == "landmarks") {
          const pref_data = getMasterData("prefs", main_data["pref_code"]);
          target_elm.append('<li class="suggest-title title-nearby result-popular">' + escapeHTML(main_data["name"]) + '</li>');
          if (main_data["type"] == "direct") {
            target_elm.append(
              createSuggestLi('result-direct', data_id_prefix + data_id, escapeHTML(pref_data["name"]), pref_data.param, '', '<p class="distance-direct">Including direct bus to ' + escapeHTML(main_data["name"]) + '</p>'));
          } else {
            target_elm.append(
              createSuggestLi('result-popular result-nearby', data_id_prefix + data_id, escapeHTML(pref_data["name"]), pref_data.param, '', '<p class="distance">From ' + escapeHTML(pref_data["name"]) + ' to ' + escapeHTML(main_data["name"]) + '<span class="distance-km">' + main_data["distance"] + '</span></p>'));
          }
        }
      })
    }
  } catch (e) {
    console.log("getPopularList_error =>", e);
  }
}

/**
 *  getPrefList
 *  éƒ½é“åºœçœŒăƒªă‚¹ăƒˆă®è¨­å®
 *
 *  @param str way å¯¾è±¡æ–¹å‘(Fromï¼depă€Toï¼arr)
 *  @param str input_val å…¥å›æ–‡å­—
 *  @param str from_selected_id ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§é¸ææ¸ˆă®ID(From)
 *  @param str to_selected_id ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§é¸ææ¸ˆă®ID(To)
 *
 *  @return dict tmp_pref_elm å‡ºå›ç”¨HTML
 */
function getPrefList(way, input_val, from_selected_id, to_selected_id) {
  try {
    arrive_pref_lists = [];
    let tmp_pref_elm = { "forward": [], partial: [] };
    let selected_id;
    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[From]ă®åˆ¶å¾¡
    if (way == "dep" && from_selected_id) {
      const arr_selected_id = from_selected_id.split("-");
      selected_id = arr_selected_id[1];
    }
    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]ă®åˆ¶å¾¡
    if (way == "arr" && to_selected_id) {
      const arr_selected_id = to_selected_id.split("-");
      if (arr_selected_id[0] == "areas") {
        return tmp_pref_elm;
      }
      selected_id = arr_selected_id[1];
    }
    if (typeof selected_id != "undefined" && selected_id != "") {
      const pref_data = getMasterData("prefs", selected_id);
      tmp_pref_elm["forward"].push(createSuggestLi('result-area', 'prefs-' + selected_id, escapeHTML(pref_data["name"]), pref_data.param, ''));
      return tmp_pref_elm;
    }
    let reg_str = "";
    if (input_val != "") {
      reg_str = new RegExp(input_val.replace(" ", ""), "i");
    }
    $.each(master_datas["pref_sort_nos"], function (index, id) {
      // Fromç”Ÿæˆæ™‚ă€ç€åœ°ăŒå­˜åœ¨ă—ăªă„ăƒ‡ăƒ¼ă‚¿ă¯å¯¾è±¡å¤–
      if (way == "dep" && !isSelectableDeparture(id)) {
        return true;
      }
      if (way == "arr" && isArrivalList(from_selected_id, id) == false) {
        return true;
      }
      const pref_data = getMasterData("prefs", id);
      // æ–‡å­—å…¥å›ă§ăƒăƒƒăƒă—ăŸăƒă‚¤ăƒ³ăƒˆă‚’è¿”ă™ă€‚(ăƒăƒƒăƒă—ăªă„å ´åˆă¯ă€Œ-1ă€)
      const match_point = pref_data["search_word"].search(reg_str);
      if (reg_str == "") {
        tmp_pref_elm["forward"].push(createSuggestLi('result-area', 'prefs-' + id, escapeHTML(pref_data["name"]), pref_data.param, ''));
        if (way == "arr") {
          arrive_pref_lists.push(id);
        }
      } else if (reg_str != "" && match_point > -1) {
        if (match_point == 0) {
          // å‰æ–¹ä¸€è‡´ă®æ™‚
          tmp_pref_elm["forward"].push(createSuggestLi('result', 'prefs-' + id, strMatchDeco(pref_data["name"], match_point, match_point + input_val.length - 1), pref_data.param, ''));
        } else {
          // éƒ¨åˆ†ä¸€è‡´ă®æ™‚
          tmp_pref_elm["partial"].push(createSuggestLi('result', 'prefs-' + id, strMatchDeco(pref_data["name"], match_point, match_point + input_val.length - 1), pref_data.param, ''));
        }
      }
    })
    return tmp_pref_elm;
  } catch (e) {
    console.log("getPrefList_error", e);
  }
}

/**
 *  getAreaList
 *  ă‚¨ăƒªă‚¢ăƒªă‚¹ăƒˆă®è¨­å®
 *
 *  @param str way å¯¾è±¡æ–¹å‘(Fromï¼depă€Toï¼arr)
 *  @param str input_val å…¥å›æ–‡å­—
 *  @param str from_selected_id ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§é¸ææ¸ˆă®ID
 *
 *  @return dict tmp_area_elm å‡ºå›ç”¨HTML
 */
function getAreaList(way, input_val, from_selected_id) {
  try {
    let tmp_area_elm = { "forward": [], partial: [] };
    // åˆ°ç€å´ă®ăƒªă‚¹ăƒˆè¡¨ç¤ºă€‚
    if (arrive_pref_lists.length > 0 && input_val == "") {
      tmp_area_elm["forward"].push('<li class="suggest-title title-area">Area list</li>');
      $.each(arrive_pref_lists, function (index, id) {
        const pref_data = getMasterData("prefs", id);
        tmp_area_elm["forward"].push(createSuggestLi('result-area', 'prefs-' + id, escapeHTML(pref_data["name"]), pref_data.param, ''));
        const area_nos = arrival_datas["arrival_nos"][from_selected_id];
        if (!area_nos) {
          return true;
        }
        $.each(area_nos[id], function (index2, area_id) {
          const area = getMasterData("areas", area_id);
          if (typeof area == "undefined" || area["name"] == "all") {
            // allă¯éƒ½é“åºœçœŒé¸æă¨åŒç¾©ăªă®ă§éè¡¨ç¤ºă«ă™ă‚‹ă€‚
            return true;
          }
          tmp_area_elm["forward"].push(createSuggestLi('result', 'areas-' + area_id, escapeHTML(area["name"]), pref_data.param, 'area.param'));
        })
      })
      return tmp_area_elm;
    }
    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[From]ă¯æ–‡å­—å…¥å›æ™‚ă®ă¿è¡¨ç¤ºă‚’OKă¨ă™ă‚‹ă€‚
    if (input_val == "") {
      return tmp_area_elm;
    }
    const reg_str = new RegExp(input_val.replace(" ", ""), "i");
    $.each(master_datas["areas"], function (id, obj) {
      let data_id_name = "prefs-";
      let data_id = obj["pref_code"];

      // Fromç”Ÿæˆæ™‚ă€ç€åœ°ăŒå­˜åœ¨ă—ăªă„ăƒ‡ăƒ¼ă‚¿ă¯å¯¾è±¡å¤–
      if (way == "dep" && !isSelectableDeparture(data_id)) {
        return true;
      }

      if (way == "arr") {
        if (isArrivalList(from_selected_id, obj["pref_code"], id) == false) {
          return true;
        }
        data_id_name = "areas-";
        data_id = id;
      }
      // ăƒăƒƒăƒă—ăŸæ–‡å­—ă®è‰²ă‚’å¤‰æ›´ă™ă‚‹ăŸă‚ă€æ–‡å­—å…¥å›ă§ăƒăƒƒăƒă—ăŸăƒă‚¤ăƒ³ăƒˆă‚’è¿”ă™ă€‚(ăƒăƒƒăƒă—ăªă„å ´åˆă¯ă€Œ-1ă€)
      const pref = getMasterData("prefs", obj["pref_code"]);
      const match_point = obj["search_word"].search(reg_str);
      const dsp_name = strMatchDeco(obj["name"], match_point, match_point + input_val.length - 1) + "<span style='color:#a9a9a9;'> - " + escapeHTML(pref["name"]) + "</span>";
      if (reg_str != "" && match_point > -1) {
        if (match_point == 0) {
          // å‰æ–¹ä¸€è‡´ă®æ™‚
          tmp_area_elm["forward"].push(createSuggestLi('result', data_id_name + data_id, dsp_name, pref.param, ''));
        } else {
          // éƒ¨åˆ†ä¸€è‡´ă®æ™‚
          tmp_area_elm["partial"].push(createSuggestLi('result', data_id_name + data_id, dsp_name, pref.param, ''));
        }
      }
    })
    return tmp_area_elm;
  } catch (e) {
    console.log("getAreaList_error", e);
  }
}

/**
 *  getLandMarkList
 *  ăƒ©ăƒ³ăƒ‰ăƒăƒ¼ă‚¯ăƒªă‚¹ăƒˆă®è¨­å®
 *
 *  @param str input_val å…¥å›æ–‡å­—
 *  @param str from_selected_id ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§é¸ææ¸ˆă®ID(From)
 *
 *  @return dict tmp_landmark_elm å‡ºå›ç”¨HTML
 */
function getLandMarkList(way, input_val, from_selected_id) {
  try {
    let tmp_landmark_elm = { "forward": [], partial: [] };
    let reg_str = "";
    if (input_val != "") {
      reg_str = new RegExp(input_val, "i");
    }
    // ăƒ©ăƒ³ăƒ‰ăƒăƒ¼ă‚¯ă®è¡¨ç¤ºă¯æ–‡å­—å…¥å›æ™‚ă‹ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[From]é¸æå¾Œă€çµă‚è¾¼ă¿ă‚’ă—ăŸæ™‚ă®ă¿OKă¨ă™ă‚‹ă€‚
    if ((way == "dep" && reg_str == "")
      || (way == "arr" && (typeof from_selected_id == "undefined" || from_selected_id == ""))) {
      return tmp_landmark_elm;
    }
    $.each(master_datas["landmarks"], function (index, obj) {
      let tmp_elm = [];
      const pref_data = getMasterData("prefs", obj["pref_code"]);
      if (pref_data == "") {
        return;
      }
      // ăƒăƒƒăƒă—ăŸæ–‡å­—ă®è‰²ă‚’å¤‰æ›´ă™ă‚‹ăŸă‚ă€æ–‡å­—å…¥å›ă§ăƒăƒƒăƒă—ăŸăƒă‚¤ăƒ³ăƒˆă‚’è¿”ă™ă€‚(ăƒăƒƒăƒă—ăªă„å ´åˆă¯ă€Œ-1ă€)
      const match_point = obj["search_word"].search(reg_str);

      // Fromç”Ÿæˆæ™‚ă€ç€åœ°ăŒå­˜åœ¨ă—ăªă„ăƒ‡ăƒ¼ă‚¿ă¯å¯¾è±¡å¤–
      if (way == "dep" && !isSelectableDeparture(obj["pref_code"])) {
        return true;
      }
      if (way == "arr" && isArrivalList(from_selected_id, obj["pref_code"], obj["area_code"]) == false) {
        return true;
      }
      if (reg_str != "" && match_point > -1) {
        if (obj["type"] == "direct") {
          tmp_elm.push(createSuggestLi('result-direct', 'prefs-' + obj["pref_code"], escapeHTML(pref_data["name"]), pref_data.param, '', '<p class="distance-direct">Including direct bus to ' + escapeHTML(obj["name"]) + '</p>'));
        } else {
          tmp_elm.push(createSuggestLi('result-nearby', 'prefs-' + obj["pref_code"], escapeHTML(pref_data["name"]), pref_data.param, '', '<p class="distance">From ' + escapeHTML(pref_data["name"]) + ' to ' + escapeHTML(obj["name"]) + '<span class="distance-km">' + obj["distance"] + '</span>'));
        }

        if (match_point == 0) {
          // å‰æ–¹ä¸€è‡´ă®æ™‚
          tmp_landmark_elm["forward"].push('<li class="suggest-title title-nearby">' + strMatchDeco(obj["name"], match_point, match_point + input_val.length - 1) + '</li>');
          tmp_landmark_elm["forward"].push(tmp_elm);
        } else {
          // éƒ¨åˆ†ä¸€è‡´ă®æ™‚
          tmp_landmark_elm["partial"].push('<li class="suggest-title title-nearby">' + strMatchDeco(obj["name"], match_point, match_point + input_val.length - 1) + '</li>');
          tmp_landmark_elm["partial"].push(tmp_elm);
        }
      }
    })
    return tmp_landmark_elm;
  } catch (e) {
    console.log("getLandMarkList_error", e);
  }
}

/**
 * Creates html for sugeest li.
 * 
 * @param {*} type_class 
 * @param {*} data_id 
 * @param {*} dispName 
 * @param {*} pref_param 
 * @param {*} area_param 
 * @param {*} suffix 
 */
function createSuggestLi(type_class, data_id, dispName, pref_param, area_param, suffix) {
  return '<li class="result ' + type_class + '"><span class="pref_name" data-id="' + data_id
    + '" data-pref="' + pref_param + '" data-area="' + area_param + '">' + dispName + '</span>'
    + (suffix ? suffix : '') + '</li>';
}

/**
 *  é¸æå¯èƒ½ăªå‡ºç™ºåœ°ă‹
 *
 *  @param from_selected_id str é¸ææ¸ˆéƒ½é“åºœçœŒă‚³ăƒ¼ăƒ‰(From)
 *  @param pref_code str æ¤œç´¢å¯¾è±¡éƒ½é“åºœçœŒă‚³ăƒ¼ăƒ‰
 *
 *  @return boolean true:æœ‰å¹ă€Falseï¼ç„¡å¹
 */
function isSelectableDeparture(pref_code) {
  try {
    return typeof arrival_datas["arrival_nos"][pref_code] != 'undefined';
  } catch (e) {
    console.log("isSelectableDeparture_error=>", e);
  }
}

/**
 *  isArrivalList
 *  åˆ°ç€ă‚¨ăƒªă‚¢ăƒ‡ăƒ¼ă‚¿ăƒă‚§ăƒƒă‚¯
 *
 *  @param from_selected_id str é¸ææ¸ˆéƒ½é“åºœçœŒă‚³ăƒ¼ăƒ‰(From)
 *  @param pref_code str æ¤œç´¢å¯¾è±¡éƒ½é“åºœçœŒă‚³ăƒ¼ăƒ‰
 *  @param area_id str æ¤œç´¢å¯¾è±¡ă‚¨ăƒªă‚¢ID
 *
 *  @return boolean true:æœ‰å¹è·¯ç·ă€Falseï¼è·¯ç·ç„¡ă—
 */
function isArrivalList(from_selected_id, pref_code, area_id) {
  try {
    const arr = arrival_datas["arrival_nos"][from_selected_id];
    if (!arr) {
      return false;
    }
    if (typeof area_id != "undefined" && area_id != "") {
      return $.inArray(area_id, arr[pref_code]) != -1;
    }
    return typeof arr[pref_code] != "undefined";
  } catch (e) {
    console.log("getArrivalList_error=>", e);
  }
}

/**
 *  objArraySort
 *  JSONă‹ă‚‰å–å¾—ă—ăŸăƒ‡ăƒ¼ă‚¿ă®ă‚½ăƒ¼ăƒˆå‡¦ç†
 *
 *  @param array ary ă‚½ăƒ¼ăƒˆå¯¾è±¡ăƒ‡ăƒ¼ă‚¿é…åˆ—
 *  @param string key1 ç¬¬1ă‚½ăƒ¼ăƒˆkey
 *  @param string order1 ç¬¬1ă‚½ăƒ¼ăƒˆé †(asc, desc)
 *  @param string key2 ç¬¬2ă‚½ăƒ¼ăƒˆkey
 *  @param string order2 ç¬¬2ă‚½ăƒ¼ăƒˆé †(asc, desc)
 *
 *  @return int çµæœ
 */
function objArraySort(ary, key1, order1, key2, order2) {
  let reverse1 = 1;
  let reverse2 = 1;
  if (order1 && order1.toLowerCase() == "desc")
    reverse1 = -1;
  if (order2 && order2.toLowerCase() == "desc")
    reverse2 = -1;
  ary.sort(function (a, b) {
    if (typeof eval("a." + key1) == "undefined")
      return 1 * reverse1;
    else if (typeof eval("b." + key1) == "undefined")
      return -1 * reverse1;
    // Compare 1st key
    else if (eval("a." + key1) < eval("b." + key1))
      return -1 * reverse1;
    else if (eval("a." + key1) > eval("b." + key1))
      return 1 * reverse1;
    else {
      // Compare 2nd key
      if (eval("a." + key2) < eval("b." + key2))
        return -1 * reverse2;
      else if (eval("a." + key2) > eval("b." + key2))
        return 1 * reverse2;
      else
        return 0;
    }
  });
}

/**
 *  defaultSet
 *  ăƒăƒ¼ă‚¸ăƒ‡ăƒ•ă‚©ăƒ«ăƒˆè¨­å®
 *  one Wayă§å‹•ă‹ă™ăŸă‚ă®è¨­å®ă‚’è¡Œă†ă€‚
 *
 *  @param string def_lang è¨€èª
 *
 *  @return ăªă—
 */
function defaultSet() {
  setLanguage(def_lang);
  setDefWord();
  setCalendar();

  $("#return-date-box", data_root).hide();
  if (wbs_default_trip == "1") {
    $('#departureSingle', data_root).removeClass("active").find('[name="roundtripFlg"]').attr("checked", false);
    $('#departureRound', data_root).addClass("active").find('[name="roundtripFlg"]').attr("checked", true);
    $("#return-date-box", data_root).val("").show();
  }
  if (typeof query_params.dt != "undefined" && query_params.dt.length == 8) {
    const dt_moment = moment(query_params.dt, "YYYYMMDD");
    if (dt_moment.isValid()) {
      $("#departureDate").datepicker('setDate', dt_moment.format(DEF_CAL_FORMAT.toUpperCase()));
    }
  }
}

/**
 *  setLanguage
 *  è¨€èªè¨­å®
 *
 *  @param string def_lang è¨€èª
 *
 *  @return ăªă—
 */
function setLanguage(target_lang) {
  // è¨€èªă”ă¨ă«ă‚«ăƒ¬ăƒ³ăƒ€ăƒ¼ă®è¡¨ç¤ºă‚’åˆ‡ă‚æ›¿ăˆă‚‹ăŸă‚ă«localeă‚’è¨­å®ă€‚
  // ä¸€éƒ¨ă®è¨€èªă¯åˆ¥ăƒ„ăƒ¼ăƒ«ă¨localeè¨­å®ă‚³ăƒ¼ăƒ‰ăŒé•ă†ç‚ºă€ăƒ‡ăƒ•ă‚©ăƒ«ăƒˆă®langă¨ă¯åˆ¥ă®è¨­å®ă‚’ă—ă¦ă„ă‚‹ă€‚
  if (target_lang == "vn") {
    moment.locale("vi");
  } else if (target_lang == "cn") {
    moment.locale("zh-cn");
  } else if (target_lang == "tw") {
    moment.locale("zh-tw");
  } else {
    moment.locale(target_lang);
  }
}

/**
 *  setDefWord
 *  ăƒăƒ¼ă‚¸ăƒ‡ăƒ•ă‚©ăƒ«ăƒˆæ–‡è¨€è¨­å®
 *
 *  @param ăªă—
 *
 *  @return ăªă—
 */
function setDefWord() {
  //word setting
  $("h1#main_title", data_root).text(MAIN_TITLE);
  $("p#period-txt", data_root).text(PERIOD_TEXT.replace("##DATE##", moment().add(3, "month").calendar()));
  $("label#departureSingle", data_root).append(DEPERTURE_SINGLE_TEXT);
  $("label#departureRound", data_root).append(DEPERTURE_ROUND_TEXT);
  $("label#fromPrefectureLabel", data_root).append(FROM_PREFECTURE_TEXT);
  $("label#toPrefectureLabel", data_root).append(TO_PREFECTURE_TEXT);
  $("button#pref_reverse", data_root).append(PREF_REVERSE_TEXT);
  $("button#pref_reset", data_root).append(PREF_RESET_TEXT);
  $("div#departure label", data_root).text(DEPERTURE_DATE_TEXT);
  $("div#return label", data_root).text(RETURN_DATE_TEXT);
  $("label#male", data_root).text(MALE_TEXT);
  $("label#female", data_root).text(FEMALE_TEXT);
  $("button#btn-search", data_root).append(SEARCH_TEXT);
  $("p#notice", data_root).append(NOTICE_TEXT);
}

/**
 *  setCalendar
 *  ăƒăƒ¼ă‚¸ăƒ‡ăƒ•ă‚©ăƒ«ăƒˆæ–‡è¨€è¨­å®
 *
 *  @param ăªă—
 *
 *  @return ăªă—
 */
function setCalendar() {
  // ă‚«ăƒ¬ăƒ³ăƒ€ăƒ¼ç”Ÿæˆ(datepicker)ă®ç‚ºă®è¨­å®
  $(document).off('.datepicker', data_root);
  $('.datepicker', data_root).datepicker({
    container: ROOT_NAME,
    format: DEF_CAL_FORMAT,
    language: def_lang,
    autoclose: true,
    startDate: new Date(),
    weekStart: DEF_WEEK_START,
    beforeShowDay: function (date) {
      let objDate = new Object();
      const md = moment(date);
      if ($.inArray(md.format("YYYYMMDD"), HOLIDAY_LIST) != -1) {
        objDate.classes = 'holiday';
      } else if (md.day() == 6) {
        objDate.classes = 'saturday';
      } else if (md.day() == 0) {
        objDate.classes = 'sunday';
      }
      return objDate;
    }
  });
}

/**
 *  hidePulldownMenu
 *  ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼ă‚’é ă™
 *
 *  @param ăªă—
 *
 *  @return ăªă—
 */
function hidePulldownMenu() {
  $(".box-suggest", data_root).hide();
}

/**
 *  setNumberOfPassengers()
 *  æ­ä¹—äººæ•°ă®è¨­å®ă‚’è¡Œă†
 *
 *  @param ăªă—
 *
 *  @return ăªă—
 */
function setNumberOfPassengers() {
  // æ­ä¹—äººæ•°ăƒ—ăƒ©ă‚¹ăƒœă‚¿ăƒ³è¨­å®(ç”·æ€§)
  $("#adultMaleCountPlusBtn", data_root).on("click", function () {
    countPeople("adultMale", true);
  });
  // æ­ä¹—äººæ•°ăƒă‚¤ăƒă‚¹ăƒœă‚¿ăƒ³è¨­å®(ç”·æ€§)
  $("#adultMaleCountMinusBtn", data_root).on("click", function () {
    countPeople("adultMale", false);
  });

  // æ­ä¹—äººæ•°ăƒ—ăƒ©ă‚¹ăƒœă‚¿ăƒ³è¨­å®(å¥³æ€§)
  $("#adultFemaleCountPlusBtn", data_root).on("click", function () {
    countPeople("adultFemale", true);
  });
  // æ­ä¹—äººæ•°ăƒă‚¤ăƒă‚¹ăƒœă‚¿ăƒ³è¨­å®(å¥³æ€§)
  $("#adultFemaleCountMinusBtn", data_root).on("click", function () {
    countPeople("adultFemale", false);
  });

  /**
   * Counts people.
   * @param {*} target 
   * @param {*} isIncrement 
   */
  function countPeople(target, isIncrement) {
    const cnt = $("#" + target + "Count", data_root).val();
    let total_cnt;
    // 0~9ă®ç¯„å›²ă§å¢—æ¸›ă‚’åˆ¶å¾¡
    if (typeof Number(cnt) == "number" && ((isIncrement && cnt >= 9) || (!isIncrement && cnt == 0))) {
      total_cnt = (isIncrement ? 9 : 0);
    } else {
      total_cnt = Number(cnt) + (isIncrement ? 1 : -1);
    }
    $("#" + target + "CountLabel", data_root).text(total_cnt);
    $("#" + target + "Count", data_root).val(total_cnt);
  }
}

/**
 *  setTripType()
 *  ç‰‡é“ă€å¾€å¾©ă®ăƒœă‚¿ăƒ³è¨­å®ă‚’è¡Œă†
 *
 *  @param ăªă—
 *  @return ăªă—
 */
function setTripType() {
  $("#departureSingle", data_root).on("click", function () {
    $("#return-date-box", data_root).val("").hide();
  });
  $("#departureRound", data_root).on("click", function () {
    $("#return-date-box", data_root).val("").show();
  });
}

/**
 *  showSuggest
 *
 *  @param way
 *  @param target_elm
 *  @param input_val
 *  @param from_selected_id
 *  @return ăªă—
 */
function showSuggest(way, target_elm, input_val, from_selected_id, to_selected_id) {
  target_elm.html("");
  // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[From]ă‹ă€ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]ă§ă€Fromå´é¸ææ¸ˆă®å ´åˆăƒªă‚¹ăƒˆăƒ‡ăƒ¼ă‚¿ă‚’è¨­å®ă™ă‚‹ă€‚
  if (way == "dep" || (way == "arr" && from_selected_id != "")) {
    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[From]åˆ¶å¾¡ă®æ™‚
    let arr_selected_id;
    if (from_selected_id) {
      arr_selected_id = from_selected_id.split("-");
      from_selected_id = arr_selected_id[1];
    }
    // ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ăƒ¡ăƒ‹ăƒ¥ăƒ¼[To]åˆ¶å¾¡ă®æ™‚
    if (to_selected_id) {
      arr_selected_id = to_selected_id.split("-");
      to_selected_id = arr_selected_id[1];
    }
    // å±¥æ­´ă®è¨­å®
    getHistoryList(way, input_val, target_elm, from_selected_id);
    // populară®è¨­å®
    getPopularList(way, input_val, target_elm, from_selected_id);
    // éƒ½é“åºœçœŒă®è¨­å®
    const pref_htmls = getPrefList(way, input_val, from_selected_id, to_selected_id);
    // ă‚¨ăƒªă‚¢ă®è¨­å®
    const area_htmls = getAreaList(way, input_val, from_selected_id);
    // ăƒ©ăƒ³ăƒ‰ăƒăƒ¼ă‚¯ă®è¨­å®
    const landmark_htmls = getLandMarkList(way, input_val, from_selected_id);
    // 1ï¼å‰æ–¹ä¸€è‡´ă€2ï¼éƒ¨åˆ†ä¸€è‡´ă®é †ç•ªă§è¡¨ç¤ºă‚’ă™ă‚‹ă€‚
    target_elm.append(pref_htmls["forward"].join(""));
    if (area_htmls) {
      target_elm.append(area_htmls["forward"].join(""));
    }
    target_elm.append(landmark_htmls["forward"].join(""));
    target_elm.append(pref_htmls["partial"].join(""));
    if (area_htmls) {
      target_elm.append(area_htmls["partial"].join(""));
    }
    target_elm.append(landmark_htmls["partial"].join(""));
  }

  if (target_elm.find("li").length == 0) {
    target_elm.html('<li class="no_results">' + (NO_MATCH_PREF_TEXT || "") + '</li>');
    ga("send", "event", "bus_search_pref_" + way, "no_result", input_val, 1);
  } else {
    if (input_val == "") {
      target_elm.find(".result-area").eq(0).before('<li class="suggest-title title-area">City list</li>');
    }
    // ăƒ‡ăƒ¼ă‚¿ăŒă‚ă‚‹æ™‚ă®ă¿ă‚¿ă‚¤ăƒˆăƒ«ă‚’è¡¨ç¤ºă™ă‚‹ă€‚(ăƒ‡ăƒ¼ă‚¿ăŒç„¡ă‘ă‚Œă°ă‚¿ă‚¤ăƒˆăƒ«è¡¨ç¤ºăªă—ă€‚)
    target_elm.find(".result-popular").eq(0).before('<li class="suggest-title title-popular">Popular area</li>');
    target_elm.find(".result-history").eq(0).before('<li class="suggest-title title-history">Search history</li>');
  }
}

/**
 *  setHistoryIds
 *  ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§ă‚»ăƒƒăƒˆă—ăŸæƒ…å ±ă®å±¥æ­´ä¿å­˜
 *
 *  @param way
 *  @param input_val
 *  @param select_pref
 *
 *  @return boolean
 */
function setHistoryIds(way, input_val, select_pref) {
  if (history_ids[way] == "undefined") {
    history_ids[way] = [];
  }

  history_ids[way].unshift(select_pref);
  history_ids[way] = history_ids[way].filter(function (x, i, self) {
    return self.indexOf(x) === i;
  });
  if (history_ids[way].length > 5) {
    history_ids[way] = history_ids[way].slice(0, 5);
  }

  localStorage.setItem("history_ids", JSON.stringify(history_ids));
  ga("send", "event", "bus_search_pref_" + way, select_pref, input_val, 1);
  return true;
}

/**
 *  getHistoryIds
 *  ăƒ—ăƒ«ăƒ€ă‚¦ăƒ³ă§ă‚»ăƒƒăƒˆă—ăŸæƒ…å ±ă®å±¥æ­´å–å¾—
 *  @param ăªă—
 *
 *  @return boolean
 */
function getHistoryIds() {
  let tmp_datas = { "dep": [], "arr": [] };
  const json = localStorage.getItem("history_ids");
  if (json) {
    tmp_datas = JSON.parse(json);
  }
  return $.when(tmp_datas);
}

/**
 *  strMatchDeco
 *  å…¥å›æ–‡å­—ă«ăƒăƒƒăƒă—ăŸéƒ¨åˆ†ă¯è‰²åè»¢ă™ă‚‹
 *
 *  @param target_str
 *  @param start_n
 *  @param last_n
 *
 *  @return string ret çµæœ[HTML]
 */
function strMatchDeco(target_str, start_n, last_n) {
  let ret = "";
  for (var i = 0, chr; i < target_str.length; i++) {
    if (i == start_n) {
      ret += '<span class="result_match">'
    }
    ret += target_str.charAt(i);
    if (i == last_n) {
      ret += '</span>'
    }
  }
  return ret;
}

/**
 *  escapeHTML
 *  HTML ç‰¹æ®æ–‡å­—å¤‰æ›å‡¦ç†
 *  @param string s å¤‰æ›å‰
 *
 *  @return string å¤‰æ›å¾Œ
 */
function escapeHTML(s) {
  return s.replace(/[&'`"<>]/g, function (match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}

/**
 *  checkParams
 *  ăƒ‘ăƒ©ăƒ¡ăƒ¼ă‚¿ăƒă‚§ăƒƒă‚¯
 *
 *  @param ăªă—
 *
 *  @return boolean true:mobile, false:other
 */
function checkParams() {
  let errors = [];
  if ($(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val() == "") {
    errors.push(ERROR_FROM_PREF);
  }
  if ($(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val() == "") {
    errors.push(ERROR_TO_PREF);
  }
  if ($("#adultMaleCount", data_root).val() == "0" && $("#adultFemaleCount", data_root).val() == "0") {
    errors.push(ERROR_PEOPLE);
  }
  if (Number($("#adultMaleCount", data_root).val()) + Number($("#adultFemaleCount", data_root).val()) > MAX_PEOPLE) {
    errors.push(ERROR_MAX_PEOPLE);
  }
  const dp_date = moment($("#departureDate", data_root).val(), DEF_CAL_FORMAT.toUpperCase());
  const rt_date = moment($("#returnDate", data_root).val(), DEF_CAL_FORMAT.toUpperCase());
  if (!dp_date.isValid()) {
    errors.push(ERROR_DEPARTURE_DATE);
  }
  if ($("input[name='roundtripFlg']:checked", data_root).val() == 1 && !rt_date.isValid()) {
    errors.push(ERROR_RETURN_DATE);
  }
  if (dp_date.isBefore(moment(), 'day')) {
    errors.push(ERROR_DEPARTURE_DATE_AFTER);
  }
  if ($("input[name='roundtripFlg']:checked", data_root).val() == 1 && rt_date.isBefore(dp_date, 'day')) {
    errors.push(ERROR_RETURN_DATE_AFTER);
  }
  if (errors.length > 0) {
    alert(errors.join("\r\n"));
    return false;
  }
  return true;
}

/**
 *  checkPref
 *
 *  Fromă«æŒ‡å®ă—ăŸéƒ½é“åºœçœŒă‚³ăƒ¼ăƒ‰ăŒă€kenFromToMap_en.jsă«å­˜åœ¨ă—ă¦ă„ă‚‹ă‹ă®ăƒă‚§ăƒƒă‚¯ă€‚
 *
 *  @param ăªă—
 *
 *  @return boolean
 */
function checkPref() {
  const from = $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val();
  const to = $(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val();
  if (typeof kenFromToMap[from] != "undefined" && (to == "" || $.inArray(to, kenFromToMap[from]) > -1)) {
    return true;
  }

  return false;
}

/**
 *  isMbDevice
 *  ă‚¢ă‚¯ă‚»ă‚¹ç«¯æœ«åˆ¤å®
 *
 *  @param ăªă—
 *
 *  @return boolean true:mobile, false:other
 */
function isMbDevice() {
  var ua = navigator.userAgent;
  if (force_mode == "mb" || ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
    return true;
  }
  return false;
}

function setLTCookie(p) {
  const val = [
    p.fdt != "" ? "1" : "0",
    p.sk,
    p.tk,
    p.sdt,
    p.fdt,
    p.mn,
    p.fn
  ]
  const key = "wbs_lt_" + def_lang;
  $.cookie(key, val.join("_"), { expires: 365 });
}

function setLTData() {
  const key = "wbs_lt_" + def_lang;
  if ($.cookie(key)) {
    const tmp_ck = $.cookie(key).split("_");
    const now_mo = moment().format("YYYYMMDD");
    if (tmp_ck.length == 7) {
      const ck_roundtripFlg = tmp_ck[0];
      const ck_fromPrefecture = tmp_ck[1];
      const ck_toPrefecture = tmp_ck[2];
      const ck_departureDate = tmp_ck[3];
      const ck_returnDate = tmp_ck[4];
      const ck_adultMaleCount = tmp_ck[5];
      const ck_adultFemaleCount = tmp_ck[6];

      ck_roundtripFlg == "1" ? $("#departureRound", data_root).trigger("click") : $("#departureSingle", data_root).trigger("click");
      if (ck_fromPrefecture && typeof arrival_datas.arrival_nos[ck_fromPrefecture.split('-')[1]] != "undefined") {
        $(FROM_PREFECTURE_ID_ELEMENT_ID, data_root).val(ck_fromPrefecture);
        const pref = getMasterData("prefs", ck_fromPrefecture.split('-')[1]);
        $(FROM_PREFECTURE_TEXT_ELEMENT_ID, data_root).val(pref.name);
        $(FROM_PREFECTURE_PARAM_ELEMENT_ID, data_root).val(pref.param);
      }
      if (ck_toPrefecture) {
        $(TO_PREFECTURE_ID_ELEMENT_ID, data_root).val(ck_toPrefecture);
        const target = ck_toPrefecture.split('-');
        if (target[0] === 'prefs') {
          const pref = getMasterData("prefs", target[1]);
          $(TO_PREFECTURE_TEXT_ELEMENT_ID, data_root).val(pref.name);
          $(TO_PREFECTURE_PARAM_ELEMENT_ID, data_root).val(pref.param);
        } else if (target[0] === 'areas') {
          const area = getMasterData("areas", target[1]);
          const pref = getMasterData("prefs", area["pref_code"]);
          $(TO_PREFECTURE_TEXT_ELEMENT_ID, data_root).val(area.name + " - " + pref.name);
          $(TO_PREFECTURE_PARAM_ELEMENT_ID, data_root).val(pref.param);
          $(TO_AREA_PARAM_ELEMENT_ID, data_root).val(area.param);
        }
      }
      if (ck_departureDate != "" && ck_departureDate >= now_mo) {
        let dt = moment(ck_departureDate, "YYYYMMDD");
        if (dt.isValid()) {
          $('#departureDate.datepicker', data_root).datepicker('update', dt.calendar());
        }
        if (ck_roundtripFlg == "1" && ck_returnDate != "" && ck_returnDate >= now_mo) {
          dt = moment(ck_returnDate);
          if (dt.isValid()) {
            $('#returnDate.datepicker', data_root).datepicker('update', dt.calendar());
          }
        }
      }

      if (typeof Number(ck_adultMaleCount) == "number" && ck_adultMaleCount <= 9 && ck_adultMaleCount >= 0) {
        $("#adultMaleCountLabel", data_root).text(ck_adultMaleCount);
        $("#adultMaleCount", data_root).val(ck_adultMaleCount);
      }
      if (typeof Number(ck_adultFemaleCount) == "number" && ck_adultFemaleCount <= 9 && ck_adultFemaleCount >= 0) {
        $("#adultFemaleCountLabel", data_root).text(ck_adultFemaleCount);
        $("#adultFemaleCount", data_root).val(ck_adultFemaleCount);
      }
    }
  }
}