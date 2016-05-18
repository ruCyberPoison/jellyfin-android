define(["jQuery","libraryBrowser","scrollStyles"],function(e,t){function a(){return"Poster"}function r(){return"Thumb"}function n(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function i(){return n()?"overflowPortrait":"portrait"}function o(){return n()?"overflowBackdrop":"backdrop"}function s(e,r,n){var o={IncludeItemTypes:"Movie",Limit:18,Fields:"PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",ParentId:n,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getJSON(ApiClient.getUrl("Users/"+r+"/Items/Latest",o)).then(function(r){var n=a(),o="";"PosterCard"==n?o+=t.getPosterViewHtml({items:r,lazy:!0,shape:i(),overlayText:!1,showTitle:!0,showYear:!0,cardLayout:!0,showDetailsMenu:!0}):"Poster"==n&&(o+=t.getPosterViewHtml({items:r,shape:i(),centerText:!0,lazy:!0,overlayText:!1,showDetailsMenu:!0,overlayPlayButton:!0}));var s=e.querySelector("#recentlyAddedItems");s.innerHTML=o,ImageLoader.lazyChildren(s)})}function l(a,n,i){var s=e(window).width(),l={SortBy:"DatePlayed",SortOrder:"Descending",IncludeItemTypes:"Movie",Filters:"IsResumable",Limit:s>=1920?6:s>=1600?4:3,Recursive:!0,Fields:"PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",CollapseBoxSetItems:!1,ParentId:i,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getItems(n,l).then(function(n){n.Items.length?e("#resumableSection",a).show():e("#resumableSection",a).hide();var i=r(),s="";"ThumbCard"==i?s+=t.getPosterViewHtml({items:n.Items,preferThumb:!0,shape:o(),showTitle:!0,showYear:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0}):"Thumb"==i&&(s+=t.getPosterViewHtml({items:n.Items,preferThumb:!0,shape:o(),overlayText:!0,showTitle:!1,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}));var l=a.querySelector("#resumableItems");l.innerHTML=s,ImageLoader.lazyChildren(l)})}function c(e){var r="",o="";switch(e.RecommendationType){case"SimilarToRecentlyPlayed":o=Globalize.translate("RecommendationBecauseYouWatched").replace("{0}",e.BaselineItemName);break;case"SimilarToLikedItem":o=Globalize.translate("RecommendationBecauseYouLike").replace("{0}",e.BaselineItemName);break;case"HasDirectorFromRecentlyPlayed":case"HasLikedDirector":o=Globalize.translate("RecommendationDirectedBy").replace("{0}",e.BaselineItemName);break;case"HasActorFromRecentlyPlayed":case"HasLikedActor":o=Globalize.translate("RecommendationStarring").replace("{0}",e.BaselineItemName)}r+='<div class="homePageSection">',r+='<h1 class="listHeader">'+o+"</h1>",r+=n()?'<div class="hiddenScrollX">':"<div>";var s=a();return"PosterCard"==s?r+=t.getPosterViewHtml({items:e.Items,lazy:!0,shape:i(),overlayText:!1,showTitle:!0,showYear:!0,cardLayout:!0,showDetailsMenu:!0}):"Poster"==s&&(r+=t.getPosterViewHtml({items:e.Items,shape:i(),centerText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0})),r+="</div>",r+="</div>"}function d(t,a){var r=e(window).width(),n=ApiClient.getUrl("Movies/Recommendations",{userId:a,categoryLimit:6,ItemLimit:r>=1920?8:r>=1600?7:r>=1200?6:5,Fields:"PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"});ApiClient.getJSON(n).then(function(a){if(!a.length)return e(".noItemsMessage",t).show(),void(t.querySelector(".recommendations").innerHTML="");var r=a.map(c).join("");e(".noItemsMessage",t).hide();var n=t.querySelector(".recommendations");n.innerHTML=r,ImageLoader.lazyChildren(n)})}function m(t,a){var r=a.querySelectorAll(".itemsContainer");n()?e(r).addClass("hiddenScrollX"):e(r).removeClass("hiddenScrollX"),e(r).createCardMenus()}function u(e,t,a){var r=t.topParentId,n=Dashboard.getCurrentUserId();l(a,n,r),s(a,n,r),AppInfo.enableMovieHomeSuggestions&&d(a,n,r)}return function(a,r){function n(e,a){a.NowPlayingItem&&"Video"==a.NowPlayingItem.MediaType&&s.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:t.selectedTab(s)}}))}function i(e,t){var n=a.querySelector(".pageTabContent[data-index='"+t+"']"),i=[];switch(t){case 0:break;case 1:i.push("scripts/movies");break;case 2:i.push("scripts/movietrailers");break;case 3:i.push("scripts/moviecollections");break;case 4:i.push("scripts/moviegenres");break;case 5:i.push("scripts/moviestudios")}require(i,function(e){0==t&&(o.tabContent=n);var i=d[t];i||(i=t?new e(a,r,n):o,d[t]=i,i.initTab&&i.initTab()),-1==y.indexOf(t)&&(y.push(t),i.renderTab())})}var o=this;o.initTab=function(){var e=a.querySelector(".pageTabContent[data-index='0']");m(a,e)},o.renderTab=function(){var e=a.querySelector(".pageTabContent[data-index='0']");u(a,r,e)},e(".recommendations",a).createCardMenus();var s=a.querySelector(".libraryViewNav"),l="movies.html",c=r.topParentId;c&&(l+="?topParentId="+c),t.configurePaperLibraryTabs(a,s,a.querySelectorAll(".pageTabContent"),[0,4,5]);var d=[],y=[];s.addEventListener("tabchange",function(e){i(a,parseInt(e.detail.selectedTabIndex))}),a.addEventListener("viewbeforeshow",function(){if(!a.getAttribute("data-title")){var e=r.topParentId;e?ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){a.setAttribute("data-title",e.Name),LibraryMenu.setTitle(e.Name)}):(a.setAttribute("data-title",Globalize.translate("TabMovies")),LibraryMenu.setTitle(Globalize.translate("TabMovies")))}}),a.addEventListener("viewshow",function(){Events.on(MediaController,"playbackstop",n)}),a.addEventListener("viewbeforehide",function(){Events.off(MediaController,"playbackstop",n)})}});