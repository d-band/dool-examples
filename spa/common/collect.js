const collect = {
  pageId: 'searchMember',
  pageContainer: null,
  currentController: null,
  lastPageId: null,
  currentMemberName: null,
  currentMemberGender: null
}
collect.init = function() {
  this.pageContainer = $('#main-contain');
}
module.exports = collect;