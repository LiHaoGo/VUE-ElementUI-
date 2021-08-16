const steps = [
  {
    element: '.rbl-tabs',
    popover: {
      className: 'first-step-popover-class',
      title: '<i class="el-icon-info" style="color:#409EFF"> 步骤 ①</i>  ',
      description: '这里是面包屑,路径导航栏。',
      position: 'bottom',
      prevBtnText: '上一步',
      nextBtnText: '下一步',
    }
  },
  {
    element: '.sersit-left',
    popover: {
      className: 'first-step-popover-class',
      title: ' <i class="el-icon-info" style="color:#409EFF"> 步骤 ②</i>',
      description: '这是您的个人信息。',
      position: 'bottom-right',
      prevBtnText: '上一步',
      nextBtnText: '下一步',
    }
  },
  {
    element: '.stt-tabs',
    popover: {
      className: 'first-step-popover-class',
      title: ' <i class="el-icon-info" style="color:#409EFF"> 步骤 ③</i>',
      description: '这里是退出按钮,会退出系统。',
      position: 'bottom-right',
      prevBtnText: '上一步',
      nextBtnText: '下一步',
    }
  },
  {
    element: '.stdy-t-left',
    popover: {
      className: 'first-step-popover-class',
      title: ' <i class="el-icon-info" style="color:#409EFF"> 步骤 ④</i>',
      description: '数据可视化',
      position: 'top',
      prevBtnText: '上一步',
      nextBtnText: '下一步',
    }
  }
]

export default steps