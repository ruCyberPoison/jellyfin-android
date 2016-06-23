define(["dialogHelper","datetime","jQuery","emby-checkbox","emby-input","emby-select","paper-item-body","paper-icon-item","emby-textarea","paper-fab","paper-icon-button-light"],function(e,t,a){function i(){return q.classList.contains("dialog")}function n(){i()&&e.close(q)}function r(e,t){function i(){require(["toast"],function(e){e(Globalize.translate("MessageItemSaved"))}),Dashboard.hideLoadingMsg(),n(!0)}ApiClient.updateItem(t).then(function(){var n=a("#selectContentType",e).val()||"";(V.ContentType||"")!=n?ApiClient.ajax({url:ApiClient.getUrl("Items/"+t.Id+"/ContentType",{ContentType:n}),type:"POST"}).then(function(){i()}):i()})}function o(e){return a(".chkAirDay:checked",e).map(function(){return this.getAttribute("data-day")}).get()}function l(e){return a("#txtAlbumArtist",e).val().trim().split(";").filter(function(e){return e.length>0}).map(function(e){return{Name:e}})}function s(e){return a("#txtArtist",e).val().trim().split(";").filter(function(e){return e.length>0}).map(function(e){return{Name:e}})}function d(e,i,n){var r=a(i,e).val();if(!r)return null;if(F[n]){var o=t.parseISO8601Date(F[n],!0),l=o.toISOString().split("T");if(0==l[0].indexOf(r)){var s=l[1];r+="T"+s}}return r}function u(){Dashboard.showLoadingMsg();var e=this;try{var t={Id:F.Id,Name:a("#txtName",e).val(),OriginalTitle:a("#txtOriginalName",e).val(),ForcedSortName:a("#txtSortName",e).val(),DisplayMediaType:a("#txtDisplayMediaType",e).val(),CommunityRating:a("#txtCommunityRating",e).val(),VoteCount:a("#txtCommunityVoteCount",e).val(),HomePageUrl:a("#txtHomePageUrl",e).val(),Budget:a("#txtBudget",e).val(),Revenue:a("#txtRevenue",e).val(),CriticRating:a("#txtCriticRating",e).val(),CriticRatingSummary:a("#txtCriticRatingSummary",e).val(),IndexNumber:a("#txtIndexNumber",e).val()||null,AbsoluteEpisodeNumber:a("#txtAbsoluteEpisodeNumber",e).val(),DvdEpisodeNumber:a("#txtDvdEpisodeNumber",e).val(),DvdSeasonNumber:a("#txtDvdSeasonNumber",e).val(),AirsBeforeSeasonNumber:a("#txtAirsBeforeSeason",e).val(),AirsAfterSeasonNumber:a("#txtAirsAfterSeason",e).val(),AirsBeforeEpisodeNumber:a("#txtAirsBeforeEpisode",e).val(),ParentIndexNumber:a("#txtParentIndexNumber",e).val()||null,DisplayOrder:a("#selectDisplayOrder",e).val(),Players:a("#txtPlayers",e).val(),Album:a("#txtAlbum",e).val(),AlbumArtist:l(e),ArtistItems:s(e),Metascore:a("#txtMetascore",e).val(),AwardSummary:a("#txtAwardSummary",e).val(),Overview:a("#txtOverview",e).val(),ShortOverview:a("#txtShortOverview",e).val(),Status:a("#selectStatus",e).val(),AirDays:o(e),AirTime:a("#txtAirTime",e).val(),Genres:p(a("#listGenres",e)),ProductionLocations:p(a("#listCountries",e)),Tags:p(a("#listTags",e)),Keywords:p(a("#listKeywords",e)),Studios:p(a("#listStudios",e)).map(function(e){return{Name:e}}),PremiereDate:d(e,"#txtPremiereDate","PremiereDate"),DateCreated:d(e,"#txtDateAdded","DateCreated"),EndDate:d(e,"#txtEndDate","EndDate"),ProductionYear:a("#txtProductionYear",e).val(),AspectRatio:a("#txtOriginalAspectRatio",e).val(),Video3DFormat:a("#select3dFormat",e).val(),OfficialRating:a("#selectOfficialRating",e).val(),CustomRating:a("#selectCustomRating",e).val(),People:F.People,LockData:e.querySelector("#chkLockData").checked,LockedFields:a(".selectLockedField",e).get().filter(function(e){return!e.checked}).map(function(e){return e.getAttribute("data-value")})};if(t.ProviderIds=a.extend({},F.ProviderIds||{}),a(".txtExternalId",e).each(function(){var e=this.getAttribute("data-providerkey");t.ProviderIds[e]=this.value}),t.PreferredMetadataLanguage=a("#selectLanguage",e).val(),t.PreferredMetadataCountryCode=a("#selectCountry",e).val(),"Person"==F.Type){var i=a("#txtPlaceOfBirth",e).val();t.ProductionLocations=i?[i]:[]}if("Series"==F.Type){var n=a("#txtSeriesRuntime",e).val();t.RunTimeTicks=n?6e8*n:null}var u=a("#txtTagline",e).val();t.Taglines=u?[u]:[],r(e,t)}catch(c){alert(c)}return!1}function c(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function p(e){return e.find(".textValue").map(function(){return a(this).text()}).get()}function m(e,t){require(["prompt"],function(i){i({label:"Value:"}).then(function(i){var n=a(e).parents(".editableListviewContainer").find(".paperList"),r=p(n);r.push(i),k(n[0],r,t)})})}function v(e){a(e).parents("paper-icon-item").remove()}function f(e,t,a){require(["components/metadataeditor/personeditor"],function(i){i.show(t).then(function(t){var i=-1==a;i&&F.People.push(t),M(e,F.People)})})}function h(){require(["refreshDialog"],function(e){new e({itemIds:[F.Id],serverId:ApiClient.serverInfo().Id}).show()})}function b(e,t,a){var i=[];i.push({name:Globalize.translate("ButtonEditImages"),id:"images",ironIcon:"photo"}),LibraryBrowser.canIdentify(a,F.Type)&&i.push({name:Globalize.translate("ButtonIdentify"),id:"identify",ironIcon:"info"}),i.push({name:Globalize.translate("ButtonRefresh"),id:"refresh",ironIcon:"refresh"}),require(["actionsheet"],function(a){a.show({items:i,positionTo:t,callback:function(a){switch(a){case"identify":LibraryBrowser.identifyItem(F.Id).then(function(){B(e,F.Id)});break;case"refresh":h(e,t);break;case"images":LibraryBrowser.editImages(F.Id)}}})})}function y(e,t){var a=t;"LibraryChanged"===a.MessageType&&-1!=a.Data.ItemsUpdated.indexOf(F.Id)&&B(q,F.Id)}function g(){Events.on(ApiClient,"websocketmessage",y)}function x(){Events.off(ApiClient,"websocketmessage",y)}function T(e){var t=c(e.target,"btnRemoveFromEditorList");t&&v(t);var a=c(e.target,"btnAddTextItem");a&&m(a)}function S(e){a(".btnCancel",e).on("click",function(){n(!1)}),e.querySelector(".btnMore").addEventListener("click",function(t){Dashboard.getCurrentUser().then(function(a){b(e,t.target,a)})}),e.querySelector(".btnHeaderSave").addEventListener("click",function(){e.querySelector(".btnSave").click()}),e.querySelector("#chkLockData").addEventListener("click",function(e){e.target.checked?a(".providerSettingsContainer").hide():a(".providerSettingsContainer").show()}),e.removeEventListener("click",T),e.addEventListener("click",T),a("form",e).off("submit",u).on("submit",u),a("#btnAddPerson",e).on("click",function(){f(e,{},-1)}),i()&&g(e)}function C(e){return e?ApiClient.getItem(Dashboard.getCurrentUserId(),e):ApiClient.getRootFolder(Dashboard.getCurrentUserId())}function A(e){return e?ApiClient.getJSON(ApiClient.getUrl("Items/"+e+"/MetadataEditor")):Promise.resolve({})}function D(e,t){var a="";a+="<option value=''></option>";for(var i=0,n=t.length;n>i;i++){var r=t[i];a+="<option value='"+r.TwoLetterISORegionName+"'>"+r.DisplayName+"</option>"}e.innerHTML=a}function w(e,t){var a="";a+="<option value=''></option>";for(var i=0,n=t.length;n>i;i++){var r=t[i];a+="<option value='"+r.TwoLetterISOLanguageName+"'>"+r.DisplayName+"</option>"}e.innerHTML=a}function P(e,t){t.ContentTypeOptions.length?a("#fldContentType",e).show():a("#fldContentType",e).hide();var i=t.ContentTypeOptions.map(function(e){return'<option value="'+e.Value+'">'+e.Name+"</option>"}).join("");a("#selectContentType",e).html(i).val(t.ContentType||"")}function N(){var e=this.getAttribute("data-formatstring"),t=this.getAttribute("data-buttonclass");this.value?a("."+t).attr("href",e.replace("{0}",this.value)):a("."+t).attr("href","#")}function L(e,t,i){for(var n="",r=t.ProviderIds||{},o=0,l=i.length;l>o;o++){var s=i[o],d="txt1"+s.Key,u="btnOpen1"+s.Key,c=s.UrlFormatString||"",p=Globalize.translate("LabelDynamicExternalId").replace("{0}",s.Name);n+='<div class="inputContainer">',n+='<div style="display: flex; align-items: center;">';var m=r[s.Key]||"";n+='<div style="flex-grow:1;">',n+='<input is="emby-input" class="txtExternalId" value="'+m+'" data-providerkey="'+s.Key+'" data-formatstring="'+c+'" data-buttonclass="'+u+'" id="'+d+'" label="'+p+'"/>',n+="</div>",c&&(n+='<a class="clearLink '+u+'" href="#" target="_blank" data-role="none" style="float: none; width: 1.75em"><button type="button" is="paper-icon-button-light"><iron-icon icon="open-in-browser"></iron-icon></button></a>'),n+="</div>",n+="</div>"}var v=a(".externalIds",e).html(n);a(".txtExternalId",v).on("change",N).trigger("change")}function O(e,t){t.Path&&"Remote"!=t.LocationType?a("#fldPath",e).show():a("#fldPath",e).hide(),"Series"==t.Type||"Movie"==t.Type||"Trailer"==t.Type?a("#fldOriginalName",e).show():a("#fldOriginalName",e).hide(),"Series"==t.Type?a("#fldSeriesRuntime",e).show():a("#fldSeriesRuntime",e).hide(),"Series"==t.Type||"Person"==t.Type?a("#fldEndDate",e).show():a("#fldEndDate",e).hide(),"Movie"==t.Type||"Game"==t.MediaType||"Trailer"==t.MediaType||"MusicVideo"==t.Type?(a("#fldBudget",e).show(),a("#fldRevenue",e).show()):(a("#fldBudget",e).hide(),a("#fldRevenue",e).hide()),"MusicAlbum"==t.Type?a("#albumAssociationMessage",e).show():a("#albumAssociationMessage",e).hide(),"Game"==t.MediaType?a("#fldPlayers",e).show():a("#fldPlayers",e).hide(),"Movie"==t.Type||"Trailer"==t.Type?(a("#fldCriticRating",e).show(),a("#fldCriticRatingSummary",e).show()):(a("#fldCriticRating",e).hide(),a("#fldCriticRatingSummary",e).hide()),"Movie"==t.Type?a("#fldAwardSummary",e).show():a("#fldAwardSummary",e).hide(),"Movie"==t.Type||"Trailer"==t.Type?a("#fldMetascore",e).show():a("#fldMetascore",e).hide(),"Series"==t.Type?(a("#fldStatus",e).show(),a("#fldAirDays",e).show(),a("#fldAirTime",e).show()):(a("#fldStatus",e).hide(),a("#fldAirDays",e).hide(),a("#fldAirTime",e).hide()),"Video"==t.MediaType&&"TvChannel"!=t.Type?a("#fld3dFormat",e).show():a("#fld3dFormat",e).hide(),"Audio"==t.Type?a("#fldAlbumArtist",e).show():a("#fldAlbumArtist",e).hide(),"Audio"==t.Type||"MusicVideo"==t.Type?(a("#fldArtist",e).show(),a("#fldAlbum",e).show()):(a("#fldArtist",e).hide(),a("#fldAlbum",e).hide()),"Episode"==t.Type?a("#collapsibleDvdEpisodeInfo",e).show():a("#collapsibleDvdEpisodeInfo",e).hide(),"Episode"==t.Type&&0==t.ParentIndexNumber?a("#collapsibleSpecialEpisodeInfo",e).show():a("#collapsibleSpecialEpisodeInfo",e).hide(),"Person"==t.Type||"Genre"==t.Type||"Studio"==t.Type||"GameGenre"==t.Type||"MusicGenre"==t.Type||"TvChannel"==t.Type?(a("#fldCommunityRating",e).hide(),a("#fldCommunityVoteCount",e).hide(),a("#genresCollapsible",e).hide(),a("#peopleCollapsible",e).hide(),a("#studiosCollapsible",e).hide(),"TvChannel"==t.Type?a("#fldOfficialRating",e).show():a("#fldOfficialRating",e).hide(),a("#fldCustomRating",e).hide()):(a("#fldCommunityRating",e).show(),a("#fldCommunityVoteCount",e).show(),a("#genresCollapsible",e).show(),a("#peopleCollapsible",e).show(),a("#studiosCollapsible",e).show(),a("#fldOfficialRating",e).show(),a("#fldCustomRating",e).show()),"Movie"==t.Type||"Trailer"==t.Type||"MusicArtist"==t.Type?a("#countriesCollapsible",e).show():a("#countriesCollapsible",e).hide(),"TvChannel"==t.Type?(a("#tagsCollapsible",e).hide(),a("#metadataSettingsCollapsible",e).hide(),a("#fldPremiereDate",e).hide(),a("#fldDateAdded",e).hide(),a("#fldYear",e).hide()):(a("#tagsCollapsible",e).show(),a("#metadataSettingsCollapsible",e).show(),a("#fldPremiereDate",e).show(),a("#fldDateAdded",e).show(),a("#fldYear",e).show()),"Movie"==t.Type||"Trailer"==t.Type||"BoxSet"==t.Type?a("#keywordsCollapsible",e).show():a("#keywordsCollapsible",e).hide(),"Video"==t.MediaType&&"TvChannel"!=t.Type?a("#fldSourceType",e).show():a("#fldSourceType",e).hide(),"Person"==t.Type?(e.querySelector("#txtProductionYear").label(Globalize.translate("LabelBirthYear")),e.querySelector("#txtPremiereDate").label(Globalize.translate("LabelBirthDate")),e.querySelector("#txtEndDate").label(Globalize.translate("LabelDeathDate")),a("#fldPlaceOfBirth",e).show()):(e.querySelector("#txtProductionYear").label(Globalize.translate("LabelYear")),e.querySelector("#txtPremiereDate").label(Globalize.translate("LabelReleaseDate")),e.querySelector("#txtEndDate").label(Globalize.translate("LabelEndDate")),a("#fldPlaceOfBirth",e).hide()),"Video"==t.MediaType&&"TvChannel"!=t.Type?a("#fldOriginalAspectRatio",e).show():a("#fldOriginalAspectRatio",e).hide(),"Audio"==t.Type||"Episode"==t.Type||"Season"==t.Type?(a("#fldIndexNumber",e).show(),e.querySelector("#txtIndexNumber").label("Episode"==t.Type?Globalize.translate("LabelEpisodeNumber"):"Season"==t.Type?Globalize.translate("LabelSeasonNumber"):"Audio"==t.Type?Globalize.translate("LabelTrackNumber"):Globalize.translate("LabelNumber"))):a("#fldIndexNumber",e).hide(),"Audio"==t.Type||"Episode"==t.Type?(a("#fldParentIndexNumber",e).show(),e.querySelector("#txtParentIndexNumber").label("Episode"==t.Type?Globalize.translate("LabelSeasonNumber"):"Audio"==t.Type?Globalize.translate("LabelDiscNumber"):Globalize.translate("LabelParentNumber"))):a("#fldParentIndexNumber",e).hide(),"BoxSet"==t.Type?(a("#fldDisplayOrder",e).show(),a("#selectDisplayOrder",e).html('<option value="SortName">'+Globalize.translate("OptionSortName")+'</option><option value="PremiereDate">'+Globalize.translate("OptionReleaseDate")+"</option>")):(a("#selectDisplayOrder",e).html(""),a("#fldDisplayOrder",e).hide());var i=a(".fldDisplaySetting",e);i.filter(function(e){return"none"!=i[e].style.display}).length?a("#collapsibleDisplaySettings",e).show():a("#collapsibleDisplaySettings",e).hide()}function I(e,i,n){var r=a("#selectOfficialRating",e);R(n,r,i.OfficialRating),r.val(i.OfficialRating||""),r=a("#selectCustomRating",e),R(n,r,i.CustomRating),r.val(i.CustomRating||"");var o=a("#selectStatus",e);E(o),o.val(i.Status||""),a("#select3dFormat",e).val(i.Video3DFormat||""),a(".chkAirDay",e).each(function(){this.checked=-1!=(i.AirDays||[]).indexOf(this.getAttribute("data-day"))}),k(a("#listCountries",e)[0],i.ProductionLocations||[]),k(a("#listGenres",e)[0],i.Genres),M(e,i.People||[]),k(a("#listStudios",e)[0],(i.Studios||[]).map(function(e){return e.Name||""})),k(a("#listTags",e)[0],i.Tags),k(a("#listKeywords",e)[0],i.Keywords);var l=i.LockData||!1,s=e.querySelector("#chkLockData");s.checked=l,s.checked?a(".providerSettingsContainer",e).hide():a(".providerSettingsContainer",e).show(),z(e,i,i.LockedFields),a("#txtPath",e).val(i.Path||""),a("#txtName",e).val(i.Name||""),a("#txtOriginalName",e).val(i.OriginalTitle||""),e.querySelector("#txtOverview").value=i.Overview||"",a("#txtShortOverview",e).val(i.ShortOverview||""),a("#txtTagline",e).val(i.Taglines&&i.Taglines.length?i.Taglines[0]:""),a("#txtSortName",e).val(i.ForcedSortName||""),a("#txtDisplayMediaType",e).val(i.DisplayMediaType||""),a("#txtCommunityRating",e).val(i.CommunityRating||""),a("#txtCommunityVoteCount",e).val(i.VoteCount||""),a("#txtHomePageUrl",e).val(i.HomePageUrl||""),a("#txtAwardSummary",e).val(i.AwardSummary||""),a("#txtMetascore",e).val(i.Metascore||""),a("#txtBudget",e).val(i.Budget||""),a("#txtRevenue",e).val(i.Revenue||""),a("#txtCriticRating",e).val(i.CriticRating||""),a("#txtCriticRatingSummary",e).val(i.CriticRatingSummary||""),a("#txtIndexNumber",e).val("IndexNumber"in i?i.IndexNumber:""),a("#txtParentIndexNumber",e).val("ParentIndexNumber"in i?i.ParentIndexNumber:""),a("#txtPlayers",e).val(i.Players||""),a("#txtAbsoluteEpisodeNumber",e).val("AbsoluteEpisodeNumber"in i?i.AbsoluteEpisodeNumber:""),a("#txtDvdEpisodeNumber",e).val("DvdEpisodeNumber"in i?i.DvdEpisodeNumber:""),a("#txtDvdSeasonNumber",e).val("DvdSeasonNumber"in i?i.DvdSeasonNumber:""),a("#txtAirsBeforeSeason",e).val("AirsBeforeSeasonNumber"in i?i.AirsBeforeSeasonNumber:""),a("#txtAirsAfterSeason",e).val("AirsAfterSeasonNumber"in i?i.AirsAfterSeasonNumber:""),a("#txtAirsBeforeEpisode",e).val("AirsBeforeEpisodeNumber"in i?i.AirsBeforeEpisodeNumber:""),a("#txtAlbum",e).val(i.Album||""),a("#txtAlbumArtist",e).val((i.AlbumArtists||[]).map(function(e){return e.Name}).join(";")),a("#selectDisplayOrder",e).val(i.DisplayOrder),a("#txtArtist",e).val((i.ArtistItems||[]).map(function(e){return e.Name}).join(";"));var d;if(i.DateCreated)try{d=t.parseISO8601Date(i.DateCreated,!0),a("#txtDateAdded",e).val(d.toISOString().slice(0,10))}catch(u){a("#txtDateAdded",e).val("")}else a("#txtDateAdded",e).val("");if(i.PremiereDate)try{d=t.parseISO8601Date(i.PremiereDate,!0),a("#txtPremiereDate",e).val(d.toISOString().slice(0,10))}catch(u){a("#txtPremiereDate",e).val("")}else a("#txtPremiereDate",e).val("");if(i.EndDate)try{d=t.parseISO8601Date(i.EndDate,!0),a("#txtEndDate",e).val(d.toISOString().slice(0,10))}catch(u){a("#txtEndDate",e).val("")}else a("#txtEndDate",e).val("");a("#txtProductionYear",e).val(i.ProductionYear||""),a("#txtAirTime",e).val(i.AirTime||"");var c=i.ProductionLocations&&i.ProductionLocations.length?i.ProductionLocations[0]:"";if(a("#txtPlaceOfBirth",e).val(c),a("#txtOriginalAspectRatio",e).val(i.AspectRatio||""),a("#selectLanguage",e).val(i.PreferredMetadataLanguage||""),a("#selectCountry",e).val(i.PreferredMetadataCountryCode||""),i.RunTimeTicks){var p=i.RunTimeTicks/6e8;a("#txtSeriesRuntime",e).val(Math.round(p))}else a("#txtSeriesRuntime",e).val("")}function R(e,t,a){var i="";i+="<option value=''></option>";var n,r,o,l=[],s=!1;for(n=0,r=e.length;r>n;n++)o=e[n],l.push({Name:o.Name,Value:o.Name}),o.Name==a&&(s=!0);for(a&&!s&&l.push({Name:a,Value:a}),n=0,r=l.length;r>n;n++)o=l[n],i+="<option value='"+o.Value+"'>"+o.Name+"</option>";t.html(i)}function E(e){var t="";t+="<option value=''></option>",t+="<option value='Continuing'>"+Globalize.translate("OptionContinuing")+"</option>",t+="<option value='Ended'>"+Globalize.translate("OptionEnded")+"</option>",e.html(t)}function k(e,t,a){t=t||[],"undefined"==typeof a?t.sort(function(e,t){return e.toLowerCase().localeCompare(t.toLowerCase())}):t=a(t);for(var i="",n=0;n<t.length;n++)i+="<paper-icon-item>",i+='<paper-fab mini style="background-color:#444;" icon="live-tv" item-icon></paper-fab>',i+="<paper-item-body>",i+='<div class="textValue">',i+=t[n],i+="</div>",i+="</paper-item-body>",i+='<button type="button" is="paper-icon-button-light" data-index="'+n+'" class="btnRemoveFromEditorList"><iron-icon icon="delete"></iron-icon></button>',i+="</paper-icon-item>";e.innerHTML=i}function M(e,t){for(var i="",n="",r=e.querySelector("#peopleList"),o=0,l=t.length;l>o;o++){var s=t[o];n+="<paper-icon-item>",n+='<paper-fab class="btnEditPerson" data-index="'+o+'" mini style="background-color:#444;" icon="person" item-icon></paper-fab>',n+="<paper-item-body>",n+='<a class="btnEditPerson clearLink" href="#" data-index="'+o+'">',n+='<div class="textValue">',n+=s.Name||"",n+="</div>",s.Role&&s.Role!=i&&(n+="<div secondary>"+s.Role+"</div>"),n+="</a>",n+="</paper-item-body>",n+='<button type="button" is="paper-icon-button-light" data-index="'+o+'" class="btnDeletePerson"><iron-icon icon="delete"></iron-icon></button>',n+="</paper-icon-item>"}r.innerHTML=n,a(".btnDeletePerson",r).on("click",function(){var t=parseInt(this.getAttribute("data-index"));F.People.splice(t,1),M(e,F.People)}),a(".btnEditPerson",r).on("click",function(){var t=parseInt(this.getAttribute("data-index"));f(e,F.People[t],t)})}function G(e,t){for(var a="",i=0;i<e.length;i++){var n=e[i],r=n.name,o=n.value||n.name,l=-1==t.indexOf(o)?" checked":"";a+="<label>",a+='<input type="checkbox" is="emby-checkbox" class="selectLockedField" data-value="'+o+'"'+l+"/>",a+="<span>"+r+"</span>",a+="</label>"}return a}function z(e,t,i){var n=a(".providerSettingsContainer",e);i=i||new Array;var r=[{name:Globalize.translate("OptionName"),value:"Name"},{name:Globalize.translate("OptionOverview"),value:"Overview"},{name:Globalize.translate("OptionGenres"),value:"Genres"},{name:Globalize.translate("OptionParentalRating"),value:"OfficialRating"},{name:Globalize.translate("OptionPeople"),value:"Cast"}];r.push("Person"==t.Type?{name:Globalize.translate("OptionBirthLocation"),value:"ProductionLocations"}:{name:Globalize.translate("OptionProductionLocations"),value:"ProductionLocations"}),"Series"==t.Type&&r.push({name:Globalize.translate("OptionRuntime"),value:"Runtime"}),r.push({name:Globalize.translate("OptionStudios"),value:"Studios"}),r.push({name:Globalize.translate("OptionTags"),value:"Tags"}),r.push({name:Globalize.translate("OptionKeywords"),value:"Keywords"}),r.push({name:Globalize.translate("OptionImages"),value:"Images"}),r.push({name:Globalize.translate("OptionBackdrops"),value:"Backdrops"}),"Game"==t.Type&&r.push({name:Globalize.translate("OptionScreenshots"),value:"Screenshots"});var o="";o+="<h1>"+Globalize.translate("HeaderEnabledFields")+"</h1>",o+="<p>"+Globalize.translate("HeaderEnabledFieldsHelp")+"</p>",o+=G(r,i),n.html(o)}function B(e,t){Dashboard.showLoadingMsg(),Promise.all([C(t),A(t)]).then(function(t){var i=t[0];V=t[1],F=i;var n=V.Cultures,r=V.Countries;P(e,V),L(e,i,V.ExternalIdInfos),w(e.querySelector("#selectLanguage"),n),D(e.querySelector("#selectCountry"),r),LibraryBrowser.renderName(i,a(".itemName",e),!0),O(e,i),I(e,i,V.ParentalRatingOptions),"Photo"==i.MediaType?a("#btnEditImages",e).hide():a("#btnEditImages",e).show(),"Video"==i.MediaType&&"Episode"!=i.Type?a("#fldShortOverview",e).show():a("#fldShortOverview",e).hide(),"Video"==i.MediaType&&"Episode"!=i.Type?a("#fldTagline",e).show():a("#fldTagline",e).hide(),Dashboard.hideLoadingMsg()})}var q,V,F;return{show:function(t){return new Promise(function(a){Dashboard.showLoadingMsg();var i=new XMLHttpRequest;i.open("GET","components/metadataeditor/metadataeditor.template.html",!0),i.onload=function(){var i=this.response,n=e.createDialog({removeOnClose:!0,size:"medium"});n.classList.add("ui-body-b"),n.classList.add("background-theme-b"),n.classList.add("formDialog");var r="";r+=Globalize.translateDocument(i),n.innerHTML=r,document.body.appendChild(n),e.open(n),n.addEventListener("close",function(){x(n),a()}),q=n,S(n),B(n,t)},i.send()})},embed:function(e,t){return new Promise(function(){Dashboard.showLoadingMsg();var a=new XMLHttpRequest;a.open("GET","components/metadataeditor/metadataeditor.template.html",!0),a.onload=function(){var a=this.response;e.innerHTML=Globalize.translateDocument(a),e.querySelector(".btnCancel").classList.add("hide"),q=e,S(e),B(e,t)},a.send()})}}});