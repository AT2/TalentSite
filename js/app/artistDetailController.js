(function() {
  app.controller("artistDetailController", [
    "$scope", "$location", "$routeParams", "ngDialog", "artistService", "agencyService", function($scope, $location, $routeParams, ngDialog, artistService, agencyService) {
      var audioPlayer, playAudioInternal, playVideoInternal, resumeAudioPlayer, resumeVideoPlayer, videoPlayer;
      $scope.profile = {};
      $scope.agency = {};
      $scope.isLoaded = false;
      $scope.videoIndex = 0;
      $scope.audioIndex = 0;
      $scope.videoSrc = "";
      videoPlayer = null;
      audioPlayer = null;
      resumeVideoPlayer = null;
      resumeAudioPlayer = null;
      $scope.init = function() {
        artistService.queryDetail($routeParams.artistId).then(function(data) {
          $scope.profile = data.Result;
          $scope.isLoaded = true;
          $scope.initCarousel();
          if ($location.url().lastIndexOf("#audio") > 0) {
            $scope.showAudios();
          } else if ($location.url().lastIndexOf("#video") > 0) {
            $scope.showVideos();
          }
        });
        agencyService.get().then(function(data) {
          $scope.agency = data.Result;
        });
      };
      $scope.findStats = function(stats) {
        return _.findWhere($scope.profile.Statistics, {
          "Code": stats
        });
      };
      $scope.playVideo = function(index) {
        if ($scope.videoIndex === index) {
          if (videoPlayer.paused()) {
            videoPlayer.play();
          } else {
            videoPlayer.pause();
          }
        } else {
          playVideoInternal(index);
        }
      };
      $scope.playAudio = function(index) {
        if ($scope.audioIndex === index) {
          if (audioPlayer.paused()) {
            audioPlayer.play();
          } else {
            audioPlayer.pause();
          }
        } else {
          playAudioInternal(index);
        }
      };
      $scope.showVideos = function() {
        $("#modalVideoShowreel ").modal();
        playVideoInternal(0);
        $("#modalVideoShowreel").on("hide.bs.modal", function() {
          videoPlayer.pause();
        });
      };
      $scope.showAudios = function() {
        $("#modalAudioShowreel ").modal();
        playAudioInternal(0);
        $("#modalAudioShowreel").on("hide.bs.modal", function() {
          audioPlayer.pause();
        });
      };
      $scope.showCreditResumeMedia = function(mediaType, mediaUrl) {
        debugger;
        if (mediaType === "V") {
          if (resumeVideoPlayer === null) {
            resumeVideoPlayer = videojs("creditVideo", {
              "controls": true,
              "preload": "auto"
            });
          }
          resumeVideoPlayer.src({
            "type": "video/mp4",
            "src": mediaUrl
          });
          resumeVideoPlayer.play();
          $("#modalResumeVideo").modal();
          $("#modalResumeVideo").on("hide.bs.modal", function() {
            resumeVideoPlayer.pause();
          });
        } else if (mediaType === "A") {
          if (resumeAudioPlayer === null) {
            resumeAudioPlayer = videojs("creditAudio", {
              "controls": true,
              "preload": "auto"
            });
          }
          resumeAudioPlayer.src({
            "type": "audio/mp3",
            "src": mediaUrl
          });
          resumeAudioPlayer.play();
          $("#modalResumeAudio").modal();
          $("#modalResumeAudio").on("hide.bs.modal", function() {
            resumeAudioPlayer.pause();
          });
        } else {
          blueimp.Gallery([mediaUrl]);
        }
      };
      playVideoInternal = function(index) {
        $scope.videoIndex = index;
        if (videoPlayer === null) {
          videoPlayer = videojs("videoShowreel", {
            "controls": true,
            "preload": "auto"
          });
          videoPlayer.on("ended", function() {
            if ($scope.videoIndex + 1 < $scope.profile.VideoList.length) {
              playVideoInternal($scope.videoIndex + 1);
            }
            $scope.$apply();
          });
        }
        videoPlayer.src({
          "type": "video/mp4",
          "src": $scope.profile.VideoList[index].VideoPath
        });
        videoPlayer.play();
      };
      playAudioInternal = function(index) {
        $scope.audioIndex = index;
        if (audioPlayer === null) {
          audioPlayer = videojs("audioShowreel", {
            "controls": true,
            "preload": "auto"
          });
          audioPlayer.on("ended", function() {
            if ($scope.audioIndex + 1 < $scope.profile.AudioList.length) {
              playAudioInternal($scope.audioIndex + 1);
            }
            $scope.$apply();
          });
        }
        audioPlayer.src({
          "type": "audio/mp3",
          "src": $scope.profile.AudioList[index].AudioPath
        });
        audioPlayer.play();
      };
      $scope.showCompCard = function() {
        return ngDialog.open({
          template: '/static/partial/_compcard_1.html',
          className: 'ngdialog-theme-default dialog-compcard',
          scope: $scope
        });
      };
      $scope.initCarousel = function() {
        $(".carousel").carousel();
        $(".carousel .carousel-large").click(function() {
          var options;
          options = $('#blueimp-gallery').data();
          options.index = $(".carousel .carousel-indicators li.active").data("slide-to");
          return blueimp.Gallery($(".carousel-indicators a"), options);
        });
        $('.carousel').on('slide.bs.carousel', function(arg) {
          var count, index, indicators, left, width;
          indicators = $(".carousel-indicators");
          width = parseInt($(".carousel").width());
          left = parseInt(indicators.css("left"));
          index = $(".carousel .carousel-indicators li.active").data("slide-to");
          count = $(".carousel .carousel-indicators li:last").data("slide-to");
          if (arg.direction === "left") {
            if (index === count && left < 0) {
              indicators.animate({
                left: 0
              });
            } else if ((index + 2) * 52 > width) {
              indicators.animate({
                left: left - 50
              });
            }
          } else {
            if (index === 0 && left >= 0) {
              indicators.animate({
                left: (count - Math.floor(width / 52)) * -70
              });
            } else if (left < 0) {
              left = left + 50;
              if (left > 0) {
                left = 0;
              }
              indicators.animate({
                left: left
              });
            }
          }
          return "";
        });
        return "";
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=artistDetailController.js.map
