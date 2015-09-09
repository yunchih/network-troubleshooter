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
  },