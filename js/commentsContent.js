$(function() {
  var url = window.location.href,
    str = $('.toplevel-thread>ol>li'),
    l = '',
    id = '',
    li = '',
    m = 10, // Jumlah komentar yang ditampilkan utama
    n = str.length,
    k = 0,
    p = 0
  // Memanggil iframe saat mengklik tombol jawab
  $('.comment a.comment-reply').click(function(e) {
    l = $('#comment-editor').attr('src')
    $('.cancel-reply').remove()
    $('.comment-actions').removeAttr('style')
    $('#top-continue.continue').hide()
    var $this = $(this),
      id = $this.attr('data-comment-id')
    l = l + '&parentID=' + id
    li = $this.parent().parent().parent().attr('id')
    $('#comment-editor').attr('src', l)
    $this.parent().hide()
    $('#comment-editor').appendTo($('#' + li + '>.comment-replybox-single'))
    $('#' + li + '>.comment-replybox-single').append('<div class="cancel-reply"><button class="theme-button blue" type="button">Batalkan</button></div>')
    $('.cancel-reply').click(function() {
      $(this).remove()
      $('.comment-actions,#top-continue.continue').removeAttr('style')
      $('#comment-editor').appendTo($('.comment-form'))
    })
  })
  // Memanggil iframe saat mengklik tombol Tambahkan komentar bawah
  $('#top-continue.continue>a.comment-reply').click(function(e) {
    e.preventDefault()
    $(this).parent().hide()
    $('.cancel-reply').remove()
    $('.comment-actions').removeAttr('style')
    $('#comment-editor').appendTo($(this).parent().next())
    $('.comment-replybox-thread').append('<div class="cancel-reply"><button class="theme-button blue" type="button">Batalkan</button></div>')
    $('.cancel-reply').click(function() {
      $(this).remove()
      $('.comment-actions,#top-continue.continue').removeAttr('style')
      $('#comment-editor').appendTo($('.comment-form'))
    })
  })
  // Memproses alamat browser jika ada tautan ke komentar
  if (url.indexOf('?showComment') != -1) {
    if (url.indexOf('#c') != -1) {
      var li = '#' + url.substring(url.indexOf('#c') + 1, url.length)
      if ($(li).parents('.comment-thread').hasClass('thirdlevel-thread')) {
        k = $(li).parents('li').parents('li').index()
      } else if ($(li).parents('.comment-thread').hasClass('secondlevel-thread')) {
        k = $(li).parents('li').index()
      } else {
        k = $(li).index()
      }
      if (k >= m) {
        for (var i = 0; i < k + 1; i++) {
          $(str[i]).removeClass('hidden')
        }
      } else {
        for (var i = 0; i < m; i++) {
          $(str[i]).removeClass('hidden')
        }
      }
      if (k < n) {
        $('#comments .loadmore').removeClass('hidden')
      }
    } else {
      for (var i = 0; i < m; i++) {
        $(str[i]).removeClass('hidden')
      }
      if (n > m) {
        $('#comments .loadmore').removeClass('hidden')
      }
    }
  } else {
    for (var i = 0; i < m; i++) {
      $(str[i]).removeClass('hidden')
    }
    if (n > m) {
      $('#comments .loadmore').removeClass('hidden')
    }
  }
  // Menampilkan lebih banyak komentar utama
  $('#comments .loadmore>a').click(function() {
    p = $('.toplevel-thread>ol>li.comment.hidden').length
    k = n - p
    if (p == 0) {
      $(this).parent().addClass('hidden')
    } else {
      for (var i = k; i < k + m; i++) {
        $(str[i]).removeClass('hidden')
      }
    }
  })
})
