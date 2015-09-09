var model = model || { enquiryMap: {} };model.issueList = {  issue: {
    title: "問題",
    enquiry: "請問你遇到什麼問題?",
    situation: [
      {
        answer: "我連不上網路",
        next: "os"
      },
      {
        answer: "網路好慢",
        next: "slowSpeed"
      }
    ]
  },
  accessibility: {
    title: "註冊網頁",
    enquiry: "你打的開 <a  target='_blank' href='http://140.112.2.197'>宿舍註冊網頁<i class='material-icons icon-external'>open_in_new</i></a> 嗎 ( dorm.ntu.edu.tw )?",
    situation: [
      {
        answer: "是",
        next: "dns"
      },
      {
        answer: "否",
        next: "contact"
      }
    ]
  },
  os: {
    title: "作業系統",
    enquiry: "你的作業系統是?",
    guides: [
      {
        name: "如何得知我的作業系統?",
        url: "guides/check-os.html"
      }
    ],
    situation: [
      {
        answer: "Windows",
        next: "networkIcon"
      },
      {
        answer: "Linux",
        next: "linuxIP"
      },
      {
        answer: "Mac OS X",
        next: "contact"
      },

      {
        answer: "我不知道",
        next: "contact"
      }
    ]
  },

  networkIcon: {
    title: "Windows 網路標示",
    enquiry: "<p>網路狀態顯示什麼？</p><br/><img src='images/windows-network-status-icon-loacation.png'/>",
    situation: [
      {
        answer: "<img class='little' src='images/status-normal.png'/>",
        next: "accessibility"
      },
      {
        answer: "<img class='little' src='images/yellow-trangle-no-trans.png'/>",
        next: "register"
      },
      {
        answer: "<img class='little' src='images/red-x-no-trans.png'/>",
        next: "hardware"
      },
      {
        answer: "其他",
        next: "contact"
      }
    ]
  },
  hardware: {
    title: "硬體",
    enquiry: "如果你室友的網路可以用，試試看把他的電腦插上你座位的網路孔。<br/> 結果如何？",
    situation: [
      {
        answer: "可以連上註冊介面（ <a  target='_blank' href='dorm.ntu.edu.tw'>dorm.ntu.edu.tw</a> ）",
        next: "networkCardBroken"
      },
      {
        answer: "不行連上註冊介面",
        next: "cableOrSocket"
      }
    ]
  },
  networkCardBroken: {
    title: "檢查網路線",
    enquiry: "如果你室友的網路可以用，試試看網路註冊線有沒有作用。<br/> 結果如何？",
    situation: [
      {
        answer: "可以動了！",
        next: "cableBroken"
      },
      {
        answer: "QQ 還是無法～",
        next: "socketBroken"
      }
    ]
  },
  cableOrSocket: {
    title: "檢查網路線",
    enquiry: "借用室友的網路線，插在你座位下的網路孔，看看網路有沒有通。<br/> 結果如何？",
    situation: [
      {
        answer: "可以動了！",
        next: "cableBroken"
      },
      {
        answer: "QQ 還是無法～",
        next: "socketBroken"
      }
    ]
  },
  cableBroken: {
    title: "我們覺得你的線壞掉了",
    enquiry: "換一條吧！",
    situation: [
      {
        answer: "Finish",
        next: "finish"
      }
    ]
  },
  socketBroken: {
    title: "你座位下的可能網路孔壞掉了。",
    enquiry: "請檢查是否有外觀上的損壞？",
    situation: [
      {
        answer: "它看起來好好的。",
        next: "computerHardware"
      },
      {
        answer: "它好像有損耗的痕跡。",
        next: "contactSocketBroken"
      }

    ] 
  },
  computerHardware: {
    title: "硬體問題",
    enquiry: "你電腦的硬體怪怪的，造成一些無法預測的問題…",
    nextPage: {
      message: "聯絡網管",
      url: "contact"
    } 
  
  },
  ip: {
    title: "你的IP是什麼?",
    enquiry: "( XX 代表 2~255 之間的數字，請不要怕 )",
    guides: [
      {
        name: "IP 要怎麼查？",
        url: "guides/check-ip.html"
      }
    ],
    situation: [
      {
        answer: "140.112.XX.XX",
        next: "block"
      },
      {
        answer: "172.XX.XX.XX",
        next: "registerAgain"
      },
      {
        answer: "169.XX.XX.XX",
        next: "dhcp"
      },
      {
        answer: "10.XX.XX.XX",
        next: "dhcp"
      },
      {
        answer: "192.168.XX.XX",
        next: "dhcp"
      },
      {
        answer: "其他",
        next: "contact"
      },
      {
        answer: "我不知道",
        next: "contact"
      }
    ]
  },
  register: {
    title: "你註冊帳號了嗎?",
    enquiry: "",
    situation: [
      {
        answer: "嗯嗯",
        next: "ip"
      },
      {
        answer: "好像還沒",
        next: "registerGuide"
      }
    ]
  },
  registerGuide: {
    title: "註冊",
    enquiry: "請確認你插上你座位上的網路孔（不要插到別人座位的網路孔！）看看你可否在<a  target='_blank' href='140.112.2.197'>此網頁</a>註冊。註冊完請等個五到十分鐘（重要！），並告訴我你的情形。",
    guides: [
      {
        name: "如何註冊宿網？",
        url: "guides/register.html"
      }
    ],
    situation: [
      {
        answer: "我註冊好了！而且網路可以動了！",
        next: "finish"
      },
      {
        answer: "網路管理系統網頁可以開，但是'宿舍網路註冊系統'這個按鈕開不起來。",
        next: "dns"
      },
      {
        answer: "我已經註冊，但是還是不能用網路…… ",
        next: "ip"
      },
      {
        answer: "我連註冊網頁都開不起來。",
        next: "ip"
      }
    ]
  },
  dhcp: {
    title: "DHCP 設定",
    enquiry: "確認你有開啟 DHCP. 如果沒有，請將之開啟，並靜候一到五分鐘。",
    guides: [
      {
        name: "怎麼知道我是否已開啟 DHCP ?",
        url: "guides/check-dhcp.html"
      },
      {
        name: "怎麼開啟 DHCP?",
        url: "guides/enable-dhcp.html"
      },
      {
        name: "怎麼知道我的 IP 是什麼?",
        url: "guides/check-ip.html"
      }
    ],
    situation: [
      {
        answer: "DHCP 已開啟, 卻仍無法連上網路。<br/>我的 IP 是 140.112.XX.XX",
        next: "block"
      },
      {
        answer: "DHCP 已開啟, 卻仍無法連上網路。<br/>我的 IP 是 192.168.XX.XX ",
        next: "renew"
      },
      {
        answer: "DHCP 已開啟, 也連上網路了！",
        next: "finish"
      },
      {
        answer: "對不起，我真的不知道你在講什麼…",
        next: "contact"
      }
    ]
  },
  block: {
    title: "IP 被鎖？",
    enquiry: "請查看<a  target='_blank' href='http://140.112.2.197/virus_st/index.html'>網路封鎖名單<i class='material-icons icon-external'>open_in_new</i></a><br/><a  target='_blank' href='http://cert.ntu.edu.tw/Module/Index/ip.php'>計中資安違規名單<i class='material-icons icon-external'>open_in_new</i></a>也可以。<br/>上面有沒有你的學號？",
    situation: [
      {
        answer: "嗯～我赫然發現自己暴於其中…",
        next: "scan"
      },
      {
        answer: "沒耶～我是無辜的。",
        next: "contact"
      }
    ]
  },
  renew: {
    title: "DHCP renew",
    enquiry: "Can you manually make your computer renew network configuration using DHCP?",
    guides: [
      {
        name: "How to make my computer renew IP using DHCP?",
        url: "guides/renew-dhcp.html"
      }
    ],
    situation: [
      {
        answer: "After I try many times, I still can not connect to the internet.",
        next: "contact"
      },
      {
        answer: "I can not understand how to do that.",
        next: "setIP"
      },
      {
        answer: "This step fix solve my problem!!",
        next: "finish"
      }
    ]
  },
  setIP: {
    title: "手動設 IP",
    enquiry: "",
    guides: [
      {
        name: "IP要怎麼查？",
        url: "guides/check-register-ip.html"
      },
      {
        name: "如何手動設 IP?",
        url: "guides/set-ip.html"
      }
    ],
    situation: [
      {
        answer: "可以上網了！！Ya！！",
        next: "finish"
      },
      {
        answer: "我還是不會設",
        next: "contact"
      }
    ]
  },
  scan: {
    title: "掃描電腦",
    guides: [
      {
        name: "如何下載計中防毒軟體？",
        url: "guides/anti-virus.html"
      }
    ],
    enquiry: "你被計中鎖了！！原因八成是中毒。<br/>請裝一套防毒軟體，並對你的電腦做全身掃毒。若無防毒軟體，可以考慮使用<a  target='_blank' href='https://www.cc.ntu.edu.tw/chinese/services/serv_e04.asp'>計中提供的防毒軟體<i class='material-icons icon-external'>open_in_new</i></a>。<br/>掃完毒後，請聯絡網管。我們會幫你解鎖。如果你一天到晚被計中鎖，我們會建議你重灌。",
    situation: [
      {
        answer: "掃毒完成",
        next: "cleanUpDone"
      },
      {
        answer: "待會再掃",
        next: "finish"
      }
    ]
  },

  slowSpeed: {
    title: "龜速網路",
    enquiry: "去 <a target='_blank' href='http://speed.ntu.edu.tw/'> NTU Speed<i class='material-icons icon-external'>open_in_new</i></a> 測試你的網速。",
    situation: [
      {
        answer: "測試結果：下載速度 > 8 mbps",
        next: "wanSpeed"
      },
      {
        answer: "測試結果：下載速度 < 8 mbps",
        next: "lanSpeed"
      }
    ]
  },
  lanSpeed: {
    title: "龜速校園網路",
    enquiry: "一定有什麼怪怪的東西在做怪…",
    situation: [
      {
        answer: "聯絡網管",
        next: "contact"
      },
      {
        answer: "算了～就這樣八",
        next: "finish"
      }
    ]
  },
  wanSpeed: {
    title: "龜速外部網路",
    enquiry: "試試 <a  target='_blank' href='http://speed2.hinet.net/do.aspx'>Hinet 測速<i class='material-icons icon-external'>open_in_new</i></a>.",
    situation: [
      {
        answer: "測試結果：下載速度 > 8 mbps",
        next: "dns"
      },
      {
        answer: "測試結果：下載速度 < 8 mbps",
        next: "reallySlow"
      }
    ]
  },
  dns: {
    title: "DNS",
    enquiry: "你的問題可能來自 DNS。 試試將 DNS 位置設為 140.112.2.162 或 140.112.2.2。如果你的第一個 DNS 地址本來就是這兩個其中一個，再試試 168.92.1.1 或 8.8.8..8",
    guides: [
      {
        name: "DNS 怎麼設？",
        url: "guides/dns.html"
      }
    ],
    situation: [
      {
        answer: "問題解決！",
        next: "finish"
      },
      {
        answer: "還是無法上網… <br/>聯絡網管八。",
        next: "contact"
      }
    ]
  },
  contact: {
    title: "聯絡網管",
    enquiry: "看來您已經達到疑難排解的極限。您的問題還是需要網管親自解決。",
    nextPage: {
      message: "聯絡網管",
      url: "contact"
    } 
  },
  finish: {
    title: "感謝您的愛用",
    enquiry: "希望此疑難排解有幫到一點小忙~",
    nextPage: {
      message: "Done",
      url: "done"
    } 
  },
  cleanUpDone: {
    title: "掃毒完成",
    enquiry: "我們會盡快幫你解鎖，完成時會立刻通知你。以後請小心下載任何程式，也不要幹壞事，<span class='emphasize'>Big Brother is Watching You!</span>",
    nextPage: {
      message: "聯絡網管",
      url: "contact"
    } 
  },
  contactSocketBroken: {
    title: "網路孔壞掉",
    enquiry: "網路孔壞掉需要專業的硬體工程師維修，我們會盡快為您聯絡。也請你以後小心使用網路孔，切莫不耐煩就硬拔亂扯。",
    nextPage: {
      message: "聯絡網管",
      url: "contact"
    } 
  },

  linuxOS: {
    title: "Linux 版本",
    enquiry: "你用哪一種 Linux ？",
    situation: [
      {
        answer: "Ubuntu",
        next: "linuxIP"
      },
      {
        answer: "CentOS",
        next: "linuxIP"
      },
      {
        answer: "其他",
        next: "contact"
      }
    ]
  },
  linuxIP: {
    title: "你的IP是什麼?",
    enquiry: "( XX 代表 2~255 之間的數字，請不要怕 )",
    guides: [
      {
        name: "IP 要怎麼查？",
        url: "guides/linux/check-ip.html"
      }
    ],
    situation: [
      {
        answer: "140.112.XX.XX",
        next: "block"
      },
      {
        answer: "172.XX.XX.XX",
        next: "registerAgain"
      },
      {
        answer: "169.XX.XX.XX",
        next: "dhcp"
      },
      {
        answer: "10.XX.XX.XX",
        next: "dhcp"
      },
      {
        answer: "192.168.XX.XX",
        next: "dhcp"
      },
      {
        answer: "我沒有獲得任何 IP",
        next: "contact"
      },
      {
        answer: "其他",
        next: "contact"
      },
      {
        answer: "我不知道",
        next: "contact"
      }
    ]
  }, }; 