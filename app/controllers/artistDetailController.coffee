app.controller "artistDetailController",["$scope", "$location", "$routeParams", "ngDialog" ,"artistService", "agencyService",
  ($scope, $location, $routeParams, ngDialog, artistService, agencyService)->
    $scope.profile = {}
    $scope.agency = {}
    $scope.isLoaded = false
    $scope.videoIndex = 0
    $scope.audioIndex = 0
    $scope.videoSrc = ""
    videoPlayer = null
    audioPlayer = null
    resumeVideoPlayer = null
    resumeAudioPlayer = null
    
    #init
    $scope.init = ->
      #get artist data
      artistService
        .queryDetail($routeParams.artistId)
        .then(
          (data)->
            $scope.profile = data.Result
            $scope.isLoaded = true
            $scope.initCarousel();
            if $location.url().lastIndexOf("#audio") > 0
                $scope.showAudios()
            else if $location.url().lastIndexOf("#video") > 0
                $scope.showVideos()
            return
        )
      #get agency data
      agencyService
        .get()
        .then(
            (data) ->
                $scope.agency = data.Result
                return
        )
      return
    #search statictis
    $scope.findStats = 
        (stats) ->
            _.findWhere($scope.profile.Statistics, { "Code":stats })
    #playVideo   
    $scope.playVideo =
        (index)->
            if($scope.videoIndex == index)
                if videoPlayer.paused()
                    videoPlayer.play()
                else
                    videoPlayer.pause()
            else
                playVideoInternal(index)
            return
    #playAudio
    $scope.playAudio =
      (index)->
        if($scope.audioIndex == index)
          if audioPlayer.paused()
            audioPlayer.play()
          else
            audioPlayer.pause()
        else
          playAudioInternal(index)
        return
    #show modals
    $scope.showVideos =
      ->
        $("#modalVideoShowreel ").modal()
        playVideoInternal(0)
        $("#modalVideoShowreel").on "hide.bs.modal",
          ->
            videoPlayer.pause()
            return
        return  
    #show audios      
    $scope.showAudios=
      ->
        $("#modalAudioShowreel ").modal()
        playAudioInternal(0)
        $("#modalAudioShowreel").on "hide.bs.modal",
          ->
            audioPlayer.pause()
            return
        return
    #Show media in credit resume
    $scope.showCreditResumeMedia=
      (mediaType, mediaUrl)->
        debugger
        if mediaType is "V"
          resumeVideoPlayer = videojs("creditVideo",{"controls":true,"preload":"auto"}) if resumeVideoPlayer==null
          resumeVideoPlayer.src
            "type":"video/mp4"
            "src": mediaUrl
          resumeVideoPlayer.play()
          $("#modalResumeVideo").modal()
          $("#modalResumeVideo").on "hide.bs.modal",
            ->
              resumeVideoPlayer.pause()
              return
        else if mediaType is "A"
          resumeAudioPlayer = videojs("creditAudio",{"controls":true,"preload":"auto"}) if resumeAudioPlayer==null
          resumeAudioPlayer.src
            "type":"audio/mp3"
            "src": mediaUrl
          resumeAudioPlayer.play()
          $("#modalResumeAudio").modal()
          $("#modalResumeAudio").on "hide.bs.modal",
            ->
              resumeAudioPlayer.pause()
              return
        else
          blueimp.Gallery([
            mediaUrl
          ]);
        return
    #play video internal
    playVideoInternal =
      (index)->
        $scope.videoIndex = index
        if videoPlayer==null
          videoPlayer = videojs("videoShowreel",{"controls":true,"preload":"auto"})
          videoPlayer.on "ended",
            ->
              playVideoInternal($scope.videoIndex + 1 ) if $scope.videoIndex + 1 < $scope.profile.VideoList.length
              $scope.$apply()
              return
        videoPlayer.src
          "type":"video/mp4"
          "src": $scope.profile.VideoList[index].VideoPath
        videoPlayer.play()
        return
    #play audio internal
    playAudioInternal =
      (index) ->
        $scope.audioIndex = index
        if audioPlayer==null
          audioPlayer = videojs("audioShowreel",{"controls":true,"preload":"auto"})
          audioPlayer.on "ended",
            ->
              playAudioInternal($scope.audioIndex + 1 ) if $scope.audioIndex + 1 < $scope.profile.AudioList.length
              $scope.$apply()
              return
        audioPlayer.src
          "type":"audio/mp3"
          "src": $scope.profile.AudioList[index].AudioPath
        audioPlayer.play()
        return
    #show Comp Card
    $scope.showCompCard = 
        ()->
            ngDialog.open({
                template: '/static/partial/_compcard_1.html',
                className: 'ngdialog-theme-default dialog-compcard',
                scope: $scope
            })
    #init carousel
    $scope.initCarousel = 
        ()->
            $(".carousel").carousel()
            $(".carousel .carousel-large").click(
                ()->
                    options = $('#blueimp-gallery').data()
                    options.index = $(".carousel .carousel-indicators li.active").data("slide-to")
                    return blueimp.Gallery($(".carousel-indicators a"), options)
            );
            $('.carousel').on('slide.bs.carousel',
                    (arg)->
                        indicators = $(".carousel-indicators")
                        width = parseInt($(".carousel").width())
                        left = parseInt(indicators.css("left"))
                        index = $(".carousel .carousel-indicators li.active").data("slide-to")
                        count = $(".carousel .carousel-indicators li:last").data("slide-to")
                        if arg.direction is "left"
                            if index == count and left < 0
                                indicators.animate({left: 0})
                            else if (index + 2 ) * 52 > width
                                indicators.animate({left: left - 50})
                        else
                            if  index == 0 and left >= 0 
                                indicators.animate({left: (count-Math.floor(width/52)) * -70})
                            else if left < 0
                                left = left + 50;
                                if left > 0 
                                    left = 0
                                indicators.animate({left: left});
                        return ""
            )
            return ""      
    return

]


