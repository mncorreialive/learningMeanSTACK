module.exports.formulario_inclusao_noticia  = function(application, req, res){
  res.render('admin/form_add_noticia', {validacao : [], noticia: {}});
}

module.exports.noticia_salvar = function(application, req, res){
  var noticia = req.body;

  req.assert('titulo','Titulo é obrigatório').notEmpty();
  req.assert('resumo','Titulo é obrigatório').notEmpty();
  req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10,100);
  req.assert('autor', 'Autor é obrigatório').notEmpty();
  req.assert('data_noticia', 'Data é obrigatório').notEmpty();
  req.assert('noticia', 'Noticia é obrigatório').notEmpty();

  var errors =  req.validationErrors();
  if(errors){
    res.render("admin/form_add_noticia", {validacao: errors, noticia: noticia});
    return;
  }

  var connection = application.config.dbConnection();
  var NoticiasDAO = new application.app.models.NoticiasDAO(connection);

  NoticiasDAO.salvarNoticia(noticia, function(err, result){
    res.redirect('/noticias');
  });
}
