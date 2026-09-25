/* ═══════════════ DADOS ═══════════════ */
var contatos = [
  { id: 1, nome: 'Maria José',         tel: '(11) 98765-4321', avatar: '👩',  sel: false },
  { id: 2, nome: 'Ana Claudia',        tel: '(21) 99123-5678', avatar: '👵',  sel: false },
  { id: 3, nome: 'Rosinha da Padaria', tel: '(11) 97654-3210', avatar: '🌸',  sel: false },
  { id: 4, nome: 'Dona Tereza',        tel: '(31) 98888-1234', avatar: '🌺',  sel: false },
  { id: 5, nome: 'Lúcia Minha Amiga',  tel: '(51) 99321-7654', avatar: '🌻',  sel: false },
  { id: 6, nome: 'Benedita',           tel: '(11) 96543-2109', avatar: '🌷',  sel: false },
  { id: 7, nome: 'Glória da Igreja',   tel: '(41) 98765-0011', avatar: '🕊️', sel: false }
];

var pacotes = [
  { id: 1, emoji: '🌸', label: 'Flores do Campo',  sel: false },
  { id: 2, emoji: '☀️', label: 'Sol Radiante',     sel: false },
  { id: 3, emoji: '🦋', label: 'Borboletas',       sel: false },
  { id: 4, emoji: '☕', label: 'Café com Amor',    sel: false },
  { id: 5, emoji: '🌺', label: 'Flores Tropicais', sel: false },
  { id: 6, emoji: '🕊️', label: 'Paz e Bênção',     sel: false }
];

var freq_atual = 'diario';


/* ═══════════════ NAVEGAÇÃO ═══════════════ */
function ir(tela_id) {
  document.querySelectorAll('.tela').forEach(function (t) {
    t.classList.remove('ativa');
  });
  document.getElementById(tela_id).classList.add('ativa');
  window.scrollTo(0, 0);

  if (tela_id === 'tela-contatos')   renderizar_contatos();
  if (tela_id === 'tela-figurinhas') renderizar_figurinhas();
  if (tela_id === 'tela-confirmar')  renderizar_resumo();
}


/* ═══════════════ CONTATOS ═══════════════ */
function renderizar_contatos() {
  var lista = document.getElementById('lista-contatos');
  lista.innerHTML = '';

  contatos.forEach(function (c) {
    var btn = document.createElement('button');
    btn.className = 'contato' + (c.sel ? ' selecionado' : '');
    btn.innerHTML =
      '<div class="avatar">' + c.avatar + '</div>' +
      '<div><span class="nome">' + c.nome + '</span><span class="tel">' + c.tel + '</span></div>' +
      '<div class="check">' + (c.sel ? '✓' : '') + '</div>';
    btn.onclick = function () {
      c.sel = !c.sel;
      renderizar_contatos();
    };
    lista.appendChild(btn);
  });

  atualizar_status_contatos();
}

function atualizar_status_contatos() {
  var n = contatos.filter(function (c) { return c.sel; }).length;
  var texto = document.getElementById('texto-contatos');
  var btn = document.getElementById('btn-continuar-contatos');

  if (n === 0) {
    texto.textContent = 'Nenhuma amiga selecionada ainda';
    btn.className = 'btn-confirmar inativo';
  } else {
    texto.textContent = n + (n === 1 ? ' amiga selecionada ✨' : ' amigas selecionadas ✨');
    btn.className = 'btn-confirmar ativo';
  }
}

function continuar_contatos() {
  var n = contatos.filter(function (c) { return c.sel; }).length;
  if (n > 0) ir('tela-horario');
}


/* ═══════════════ HORÁRIO ═══════════════ */
function gerar_opcoes_hora() {
  var select = document.getElementById('sel-hora');
  for (var h = 0; h < 24; h++) {
    var v = String(h).padStart(2, '0');
    var opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    if (h === 7) opt.selected = true;
    select.appendChild(opt);
  }
}

function atualizar_horario() {
  var h = document.getElementById('sel-hora').value;
  var m = document.getElementById('sel-min').value;
  document.getElementById('horario-label').textContent = 'Envio às ' + h + ':' + m + ' horas';
}

function sel_freq(id) {
  freq_atual = id;
  ['diario', 'uteis', 'fds'].forEach(function (f) {
    var btn = document.getElementById('freq-' + f);
    var check = btn.querySelector('.check-freq');
    if (f === id) {
      btn.classList.add('selecionado');
      check.classList.remove('oculto');
    } else {
      btn.classList.remove('selecionado');
      check.classList.add('oculto');
    }
  });
}

function atualizar_chars() {
  var t = document.getElementById('mensagem-texto').value;
  document.getElementById('char-count').textContent = t.length + ' caracteres';
}


/* ═══════════════ FIGURINHAS ═══════════════ */
function renderizar_figurinhas() {
  var grade = document.getElementById('grade-figurinhas');
  grade.innerHTML = '';

  pacotes.forEach(function (p) {
    var btn = document.createElement('button');
    btn.className = 'sticker-btn' + (p.sel ? ' selecionado' : '');
    btn.innerHTML =
      '<span class="sticker-emoji">' + p.emoji + '</span>' +
      '<span class="sticker-label">' + p.label + '</span>' +
      (p.sel ? '<div class="sticker-check">✓</div>' : '');
    btn.onclick = function () {
      p.sel = !p.sel;
      renderizar_figurinhas();
    };
    grade.appendChild(btn);
  });

  atualizar_status_figurinhas();
}

function atualizar_status_figurinhas() {
  var n = pacotes.filter(function (p) { return p.sel; }).length;
  var texto = document.getElementById('texto-figurinhas');
  var btn = document.getElementById('btn-continuar-figurinhas');

  if (n === 0) {
    texto.textContent = 'Nenhum pacote selecionado ainda';
    btn.className = 'btn-confirmar inativo';
  } else {
    texto.textContent = n + (n === 1 ? ' pacote selecionado 🎨' : ' pacotes selecionados 🎨');
    btn.className = 'btn-confirmar ativo';
  }
}


/* ═══════════════ RESUMO ═══════════════ */
function renderizar_resumo() {
  var div_c = document.getElementById('resumo-contatos');
  div_c.innerHTML = '';
  contatos.filter(function (c) { return c.sel; }).forEach(function (c) {
    var linha = document.createElement('div');
    linha.className = 'card-linha';
    linha.innerHTML = '<span class="ic">' + c.avatar + '</span> ' + c.nome;
    div_c.appendChild(linha);
  });

  var div_f = document.getElementById('resumo-figurinhas');
  div_f.innerHTML = '';
  pacotes.filter(function (p) { return p.sel; }).forEach(function (p) {
    var tag = document.createElement('div');
    tag.className = 'resumo-tag';
    tag.innerHTML = '<span class="resumo-emoji">' + p.emoji + '</span>' + p.label;
    div_f.appendChild(tag);
  });
}


/* ═══════════════ INICIALIZAÇÃO ═══════════════ */
gerar_opcoes_hora();
renderizar_contatos();
renderizar_figurinhas();
