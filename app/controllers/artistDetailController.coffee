app.controller "artistDetailController",["$scope","artistService",
  ($scope, artistService)->
    $scope.profile = {}
    $scope.videoIndex = 0
    $scope.audioIndex = 0
    $scope.videoSrc = ""
    videoPlayer = null
    audioPlayer = null
    resumeVideoPlayer = null
    resumeAudioPlayer = null

    $scope.init = ->
      artistService
        .queryDetail("153208")
        .then(
          (data)->
            $scope.profile = data.Result
            return
        )
      return

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
    #play video
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
    #play audio
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
    return

]


