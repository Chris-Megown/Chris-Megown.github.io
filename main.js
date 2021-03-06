jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);    
     
        var list = $('<dl/>');
        target.empty().append(list);
        var newRepos = $(repos).slice(0,3);
        $(newRepos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                var myDate = new Date(this.updated_at);
                list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                list.append('<dd>' + this.description +'</dd>');
                list.append("Most recently updated on: " + '<dd>' + (myDate.getMonth() + 1) + '/'+  myDate.getDate() + '/' + myDate.getFullYear() + '</dd></br>');
            }
        });      
      });
      
    function sortByName(repos) {
       repos.sort(function(a, b) {
    a = new Date(a.updated_at);
    b = new Date(b.updated_at);
    return a>b ? -1 : a<b ? 1 : 0;
});
    }
};
   