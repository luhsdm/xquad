from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import PageTemplate, Frame
from reportlab.pdfgen import canvas as pdfcanvas

OUTPUT = r"C:\Users\oluca\OneDrive\Desktop\xquad-l3m\relatorio_julianamedeiiros.pdf"

# --- Palette ---
ROSA       = colors.HexColor("#C2185B")
ROSA_LIGHT = colors.HexColor("#F8BBD9")
ROSA_BG    = colors.HexColor("#FFF0F5")
ROXO       = colors.HexColor("#7B1FA2")
ROXO_LIGHT = colors.HexColor("#E1BEE7")
CINZA      = colors.HexColor("#555555")
CINZA_LIGHT= colors.HexColor("#F5F5F5")
BRANCO     = colors.white
PRETO      = colors.HexColor("#222222")
VERDE      = colors.HexColor("#2E7D32")
VERMELHO   = colors.HexColor("#C62828")
AMARELO_BG = colors.HexColor("#FFF8E1")
AMARELO    = colors.HexColor("#F57F17")

W, H = A4

# --- Header/Footer via canvas ---
def on_page(canv, doc):
    canv.saveState()
    # Top bar
    canv.setFillColor(ROSA)
    canv.rect(0, H - 1.1*cm, W, 1.1*cm, fill=1, stroke=0)
    canv.setFillColor(BRANCO)
    canv.setFont("Helvetica-Bold", 9)
    canv.drawString(1.5*cm, H - 0.75*cm, "ANÁLISE ESTRATÉGICA INSTAGRAM")
    canv.setFont("Helvetica", 8)
    canv.drawRightString(W - 1.5*cm, H - 0.75*cm, "@julianamedeiiros_ | Fev–Mai 2026")
    # Bottom bar
    canv.setFillColor(ROSA_LIGHT)
    canv.rect(0, 0, W, 0.8*cm, fill=1, stroke=0)
    canv.setFillColor(CINZA)
    canv.setFont("Helvetica", 7.5)
    canv.drawString(1.5*cm, 0.3*cm, "Relatório preparado por xquad  |  Dados: Meta Business Suite  |  Período: Fev–Mai 2026")
    canv.drawRightString(W - 1.5*cm, 0.3*cm, f"Página {doc.page}")
    canv.restoreState()

def on_first_page(canv, doc):
    canv.saveState()
    # Cover gradient bar top
    canv.setFillColor(ROSA)
    canv.rect(0, H - 5.5*cm, W, 5.5*cm, fill=1, stroke=0)
    # Decorative circle
    canv.setFillColor(ROXO)
    canv.setStrokeColor(BRANCO)
    canv.setLineWidth(0)
    canv.circle(W - 3*cm, H - 2.5*cm, 2.2*cm, fill=1, stroke=0)
    canv.setFillColor(ROSA_LIGHT)
    canv.circle(W - 3*cm, H - 2.5*cm, 1.4*cm, fill=1, stroke=0)
    # Title text
    canv.setFillColor(BRANCO)
    canv.setFont("Helvetica-Bold", 26)
    canv.drawString(1.5*cm, H - 2.2*cm, "Análise Estratégica")
    canv.setFont("Helvetica-Bold", 26)
    canv.drawString(1.5*cm, H - 3.1*cm, "Instagram")
    canv.setFont("Helvetica", 13)
    canv.drawString(1.5*cm, H - 3.9*cm, "@julianamedeiiros_  |  Fevereiro – Maio 2026")
    canv.setFont("Helvetica", 10)
    canv.setFillColor(ROSA_LIGHT)
    canv.drawString(1.5*cm, H - 4.7*cm, "Preparado por xquad  |  Maio 2026")
    # Bottom bar
    canv.setFillColor(ROSA_LIGHT)
    canv.rect(0, 0, W, 0.8*cm, fill=1, stroke=0)
    canv.setFillColor(CINZA)
    canv.setFont("Helvetica", 7.5)
    canv.drawString(1.5*cm, 0.3*cm, "Relatório preparado por xquad  |  Dados: Meta Business Suite  |  Período: Fev–Mai 2026")
    canv.drawRightString(W - 1.5*cm, 0.3*cm, "Página 1")
    canv.restoreState()

# --- Doc setup ---
doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=1.5*cm, rightMargin=1.5*cm,
    topMargin=2.0*cm, bottomMargin=1.5*cm,
    title="Análise Estratégica Instagram – @julianamedeiiros_",
    author="xquad",
)

styles = getSampleStyleSheet()

def style(name, **kw):
    return ParagraphStyle(name, **kw)

S_TITULO_SEC = style("TituloSec",
    fontName="Helvetica-Bold", fontSize=12, textColor=BRANCO,
    spaceAfter=2, spaceBefore=4, leading=16,
)
S_NORMAL = style("Normal2",
    fontName="Helvetica", fontSize=9.5, textColor=PRETO,
    spaceAfter=4, leading=14,
)
S_BOLD = style("Bold2",
    fontName="Helvetica-Bold", fontSize=9.5, textColor=PRETO,
    spaceAfter=4, leading=14,
)
S_SMALL = style("Small",
    fontName="Helvetica", fontSize=8.5, textColor=CINZA,
    spaceAfter=3, leading=12,
)
S_ALERTA = style("Alerta",
    fontName="Helvetica-Bold", fontSize=9.5, textColor=VERMELHO,
    spaceAfter=4, leading=14,
)
S_DESTAQUE = style("Destaque",
    fontName="Helvetica-Bold", fontSize=9.5, textColor=ROXO,
    spaceAfter=4, leading=14,
)
S_TABLE_HEADER = style("TableHeader",
    fontName="Helvetica-Bold", fontSize=8.5, textColor=BRANCO,
    alignment=TA_CENTER, leading=11,
)
S_TABLE_CELL = style("TableCell",
    fontName="Helvetica", fontSize=8.5, textColor=PRETO,
    alignment=TA_LEFT, leading=11,
)
S_TABLE_CELL_CENTER = style("TableCellC",
    fontName="Helvetica", fontSize=8.5, textColor=PRETO,
    alignment=TA_CENTER, leading=11,
)
S_KPI_LABEL = style("KpiLabel",
    fontName="Helvetica-Bold", fontSize=9, textColor=CINZA,
    alignment=TA_CENTER, leading=12,
)
S_KPI_VALUE = style("KpiValue",
    fontName="Helvetica-Bold", fontSize=18, textColor=ROSA,
    alignment=TA_CENTER, leading=22,
)

def section_header(title):
    """Pink section header block."""
    data = [[Paragraph(f"  {title}", S_TITULO_SEC)]]
    t = Table(data, colWidths=[W - 3*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), ROSA),
        ("ROWPADDING", (0,0), (-1,-1), 6),
        ("ROUNDEDCORNERS", [4]),
        ("GRID", (0,0), (-1,-1), 0, ROSA),
    ]))
    return t

def make_table(headers, rows, col_widths, alternate=True, highlight_col=None, viral_row=None):
    header_row = [Paragraph(h, S_TABLE_HEADER) for h in headers]
    data = [header_row]
    for i, row in enumerate(rows):
        data.append([Paragraph(str(c), S_TABLE_CELL_CENTER if j > 0 else S_TABLE_CELL)
                     for j, c in enumerate(row)])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    ts = [
        ("BACKGROUND", (0,0), (-1,0), ROSA),
        ("TEXTCOLOR",  (0,0), (-1,0), BRANCO),
        ("FONTNAME",   (0,0), (-1,0), "Helvetica-Bold"),
        ("ROWPADDING", (0,0), (-1,-1), 5),
        ("GRID",       (0,0), (-1,-1), 0.3, colors.HexColor("#E0E0E0")),
        ("VALIGN",     (0,0), (-1,-1), "MIDDLE"),
    ]
    if alternate:
        for i in range(1, len(rows)+1):
            if i % 2 == 0:
                ts.append(("BACKGROUND", (0,i), (-1,i), CINZA_LIGHT))
            else:
                ts.append(("BACKGROUND", (0,i), (-1,i), BRANCO))
    if viral_row is not None:
        ts.append(("BACKGROUND", (0, viral_row), (-1, viral_row), colors.HexColor("#FCE4EC")))
        ts.append(("FONTNAME",   (0, viral_row), (-1, viral_row), "Helvetica-Bold"))
        ts.append(("TEXTCOLOR",  (0, viral_row), (-1, viral_row), ROSA))
    t.setStyle(TableStyle(ts))
    t._extra_cmds = ts
    return t

def kpi_box(label, value, sub=""):
    data = [
        [Paragraph(value, S_KPI_VALUE)],
        [Paragraph(label, S_KPI_LABEL)],
    ]
    if sub:
        data.append([Paragraph(sub, S_SMALL)])
    t = Table(data, colWidths=[(W - 3*cm)/4 - 0.3*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), ROSA_BG),
        ("ROWPADDING", (0,0), (-1,-1), 4),
        ("BOX", (0,0), (-1,-1), 1, ROSA_LIGHT),
        ("ROUNDEDCORNERS", [6]),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
    ]))
    return t

# ================================================================
story = []
inner_w = W - 3*cm

# ---- COVER SPACER (header bar is drawn on canvas) ----
story.append(Spacer(1, 5.8*cm))

# ---- KPI STRIP ----
story.append(Spacer(1, 0.4*cm))
kpis = Table(
    [[kpi_box("Posts Analisados", "40", "Fev–Mai 2026"),
      kpi_box("Engajamento Médio", "7,1%", "Benchmark: 3–5%"),
      kpi_box("Post Viral (views)", "2,29M", "Um abraço bem apertado"),
      kpi_box("Compartilhamentos", "17.249", "Post de 03/05 – 12s"),
    ]],
    colWidths=[(inner_w/4)]*4, hAlign="LEFT"
)
kpis.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),4),("RIGHTPADDING",(0,0),(-1,-1),4)]))
story.append(kpis)
story.append(Spacer(1, 0.5*cm))

# ---- SEÇÃO 1 ----
story.append(section_header("01  Visão Geral do Período"))
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph(
    "O post viral de 03/05 (<b>\"Um abraço bem apertado\"</b>) representa <b>86,9%</b> de todos os views do período — "
    "<b>2,29M views, 17.249 compartilhamentos, 352 novos seguidores</b> e <b>4.761 salvamentos</b> em apenas <b>12 segundos</b> de vídeo.",
    S_NORMAL))
story.append(Paragraph(
    "Sem o viral, a mediana real da conta é ~5.700 views/post — ainda com engajamento <b>2× acima do benchmark do nicho</b>.",
    S_NORMAL))
story.append(Spacer(1, 0.4*cm))

# ---- SEÇÃO 2 ----
story.append(section_header("02  Perfil do Público"))
story.append(Spacer(1, 0.3*cm))

pub_data = [
    ["Segmento", "Percentual", "Segmento", "Percentual"],
    ["Mulheres 25–34 (core)", "50,8%", "Total Brasil", "94,2%"],
    ["Mulheres 35–44",        "19,6%", "Feminino total", "~92%"],
    ["Mulheres 18–24",        "14,8%", "Homens total",  "~8%"],
]
pub_t = Table(
    [[Paragraph(c, S_TABLE_HEADER if i==0 else (S_BOLD if j%2==0 else S_NORMAL))
      for j,c in enumerate(row)] for i,row in enumerate(pub_data)],
    colWidths=[inner_w*0.35, inner_w*0.15, inner_w*0.35, inner_w*0.15]
)
pub_t.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), ROXO),
    ("TEXTCOLOR",  (0,0), (-1,0), BRANCO),
    ("FONTNAME",   (0,0), (-1,0), "Helvetica-Bold"),
    ("ROWPADDING", (0,0), (-1,-1), 5),
    ("GRID",       (0,0), (-1,-1), 0.3, colors.HexColor("#E0E0E0")),
    ("BACKGROUND", (0,1), (-1,1), BRANCO),
    ("BACKGROUND", (0,2), (-1,2), CINZA_LIGHT),
    ("BACKGROUND", (0,3), (-1,3), BRANCO),
    ("FONTNAME",   (0,1), (0,-1), "Helvetica-Bold"),
    ("FONTNAME",   (2,1), (2,-1), "Helvetica-Bold"),
]))
story.append(pub_t)
story.append(Spacer(1, 0.2*cm))
story.append(Paragraph(
    "<b>Top cidades:</b> São Paulo (9,1%) · Rio de Janeiro (2,5%) · Guarulhos (1,9%) · "
    "Fortaleza (0,9%) · Salvador (0,9%) · Belo Horizonte (0,8%)", S_SMALL))
story.append(Spacer(1, 0.4*cm))

# ---- SEÇÃO 3 ----
story.append(section_header("03  Ranking de Categorias por Performance"))
story.append(Spacer(1, 0.3*cm))

cat_headers = ["Categoria de Conteúdo", "Views Médios", "Shares Médios", "Potencial Viral"]
cat_rows = [
    ["Emocional / Família",  "9.600",  "19", "ALTO"],
    ["Humor de Casal",       "9.070",  "70", "ALTO"],
    ["Fé / Espiritualidade", "9.499",  "5",  "MÉDIO"],
    ["SHEIN Reel (parceria)","5.109",  "5",  "BAIXO"],
    ["Vlog / Rotina",        "4.913",  "0",  "BAIXO"],
    ["SHEIN Carrossel",      "4.791",  "1",  "NULO"],
    ["Imagem Estática",      "2.185",  "0",  "NULO"],
]
cat_widths = [inner_w*0.38, inner_w*0.20, inner_w*0.18, inner_w*0.24]
cat_t = make_table(cat_headers, cat_rows, cat_widths)
# Color viral potential column
ts_extra = list(cat_t._extra_cmds)
for i, row in enumerate(cat_rows, start=1):
    v = row[3]
    if v == "ALTO":
        ts_extra.append(("TEXTCOLOR", (3,i), (3,i), VERDE))
        ts_extra.append(("FONTNAME",  (3,i), (3,i), "Helvetica-Bold"))
    elif v == "MÉDIO":
        ts_extra.append(("TEXTCOLOR", (3,i), (3,i), AMARELO))
    elif v in ("BAIXO","NULO"):
        ts_extra.append(("TEXTCOLOR", (3,i), (3,i), colors.HexColor("#999999")))
cat_t.setStyle(TableStyle(ts_extra))
story.append(cat_t)
story.append(Spacer(1, 0.2*cm))

box_destaque = Table(
    [[Paragraph(
        "★  <b>Humor de Casal</b> é o formato mais <b>subexplorado</b>: apenas 3 posts no período, "
        "todos no top 7 de compartilhamentos da conta. Taxa de share de <b>1% dos views</b> — "
        "o maior da conta. Está <b>zerado em Maio</b>.",
        style("d", fontName="Helvetica", fontSize=9, textColor=ROXO, leading=13))
    ]],
    colWidths=[inner_w]
)
box_destaque.setStyle(TableStyle([
    ("BACKGROUND", (0,0),(-1,-1), ROXO_LIGHT),
    ("ROWPADDING", (0,0),(-1,-1), 8),
    ("BOX", (0,0),(-1,-1), 1, ROXO),
    ("ROUNDEDCORNERS",[4]),
]))
story.append(box_destaque)
story.append(Spacer(1, 0.4*cm))

# ---- SEÇÃO 4 ----
story.append(section_header("04  Duração Ótima dos Vídeos"))
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph(
    "Vídeos de <b>9–25 segundos</b> dominam os melhores resultados da conta. "
    "Acima de 2 minutos há queda consistente de 20–30% em views.", S_NORMAL))
story.append(Spacer(1, 0.2*cm))

dur_headers = ["Duração", "Post", "Views", "Compart."]
dur_rows = [
    ["9s",   '"Por que você tá com essa cara?"',   "12.580",    "126"],
    ["9s",   '"Toda vez a mesma pergunta"',          "7.464",     "49"],
    ["11s",  '"É só fazendo conta"',                "7.167",     "35"],
    ["12s",  '"Um abraço bem apertado" ★ VIRAL',   "2.294.116", "17.249"],
    ["12s",  '"Deus provê, Deus proverá"',          "11.615",    "35"],
    ["23s",  '"Gratidão" conquista',               "26.474",    "36"],
]
dur_widths = [inner_w*0.09, inner_w*0.51, inner_w*0.22, inner_w*0.18]
story.append(make_table(dur_headers, dur_rows, dur_widths, viral_row=4))
story.append(Spacer(1, 0.4*cm))

# ---- SEÇÃO 5 ----
story.append(section_header("05  ⚠  Alerta — Queda em Maio"))
story.append(Spacer(1, 0.3*cm))

alerta_box = Table(
    [[Paragraph(
        "QUEDA DE 44,8% em views e 92,9% em shares em Maio vs Abril. "
        "Causa: <b>zero posts de humor de casal</b> + duração média subindo "
        "(64s em Maio vs 35s em Abril). <b>Não é sazonalidade — é mix de conteúdo.</b>",
        style("ab", fontName="Helvetica-Bold", fontSize=9.5, textColor=VERMELHO, leading=14))
    ]],
    colWidths=[inner_w]
)
alerta_box.setStyle(TableStyle([
    ("BACKGROUND", (0,0),(-1,-1), colors.HexColor("#FFEBEE")),
    ("ROWPADDING", (0,0),(-1,-1), 8),
    ("BOX", (0,0),(-1,-1), 1.5, VERMELHO),
    ("ROUNDEDCORNERS",[4]),
]))
story.append(alerta_box)
story.append(Spacer(1, 0.25*cm))

tend_headers = ["Período", "Views Médios", "Shares Médios", "Tendência"]
tend_rows = [
    ["Fevereiro", "8.245", "6",  "→ estável"],
    ["Março",     "6.897", "16", "↗ subindo"],
    ["Abril",     "8.665", "14", "✓ pico"],
    ["Maio",      "4.778", "1",  "↘ QUEDA"],
]
tend_widths = [inner_w*0.22]*4
tend_t = make_table(tend_headers, tend_rows, tend_widths)
ts_tend = list(tend_t._extra_cmds)
for i, row in enumerate(tend_rows, start=1):
    if "QUEDA" in row[3]:
        ts_tend.append(("TEXTCOLOR",  (3,i),(3,i), VERMELHO))
        ts_tend.append(("FONTNAME",   (3,i),(3,i), "Helvetica-Bold"))
        ts_tend.append(("BACKGROUND", (0,i),(-1,i), colors.HexColor("#FFEBEE")))
    elif "pico" in row[3]:
        ts_tend.append(("TEXTCOLOR",  (3,i),(3,i), VERDE))
        ts_tend.append(("FONTNAME",   (3,i),(3,i), "Helvetica-Bold"))
tend_t.setStyle(TableStyle(ts_tend))
story.append(tend_t)
story.append(Spacer(1, 0.4*cm))

# ---- SEÇÃO 6 ----
story.append(section_header("06  Posts para Impulsionar no Meta"))
story.append(Spacer(1, 0.3*cm))

boost_headers = ["#", "Post", "Motivo", "Budget"]
boost_rows = [
    ["1", '"Um abraço bem apertado" (03/05)', "Prova social 2,29M visível = CPF mais baixo", "50–60%"],
    ["2", '"Por que você tá com essa cara?" (03/08)', "126 shares = público amplifica o anúncio", "20%"],
    ["3", '"Deus provê, Deus proverá" (04/01)', "CPM baixo em audiência religiosa BR", "15%"],
    ["4", '"Gratidão" conquista (04/12)', "26K alcance orgânico + 103 comentários", "Retargeting"],
]
boost_widths = [inner_w*0.04, inner_w*0.31, inner_w*0.43, inner_w*0.22]
story.append(make_table(boost_headers, boost_rows, boost_widths))
story.append(Spacer(1, 0.2*cm))

no_boost = Table(
    [[Paragraph(
        "🚫  <b>Nunca impulsionar posts SHEIN</b> para campanha de seguidores — "
        "zero follow rate, zero compartilhamento, não gera identificação com a audiência.",
        style("nb", fontName="Helvetica", fontSize=9, textColor=colors.HexColor("#7B1FA2"), leading=13))
    ]],
    colWidths=[inner_w]
)
no_boost.setStyle(TableStyle([
    ("BACKGROUND", (0,0),(-1,-1), ROXO_LIGHT),
    ("ROWPADDING", (0,0),(-1,-1), 7),
    ("BOX", (0,0),(-1,-1), 1, ROXO),
    ("ROUNDEDCORNERS",[4]),
]))
story.append(no_boost)
story.append(Spacer(1, 0.4*cm))

# ---- SEÇÃO 7 ----
story.append(section_header("07  Estrutura da Campanha Meta Ads"))
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph("<b>Objetivo:</b> Engajamento › Reconhecimento (alcance único) com <b>CBO ativado</b>", S_NORMAL))
story.append(Spacer(1, 0.2*cm))

camp_headers = ["Conjunto", "Segmentação", "Criativo", "Budget/dia"]
camp_rows = [
    ["Mães core",           "Mulheres 25–44, BR\nMaternidade/Família/Parenting", "Post viral abraço",        "R$ 20"],
    ["Religiosas",          "Mulheres 25–44, BR\nCristianismo/Bíblia/Igreja",   '"Deus provê" + batismo',   "R$ 10"],
    ["Casal/Relacionamento","Mulheres 22–40, BR\nCasadas/Noivas + Comédia",     "Humor casal",              "R$ 10"],
    ["Retargeting",         "Viram 50%+ vídeos +\nvisitaram perfil (14 dias)",  "Post diferente do visto",  "R$  5"],
]
camp_widths = [inner_w*0.18, inner_w*0.32, inner_w*0.32, inner_w*0.18]
story.append(make_table(camp_headers, camp_rows, camp_widths))
story.append(Spacer(1, 0.25*cm))

# Budget boxes
bud_data = [
    [Paragraph("R$ 630", S_KPI_VALUE),
     Paragraph("R$ 80–120/dia", S_KPI_VALUE),
     Paragraph("R$ 0,50–1,00", S_KPI_VALUE),
     Paragraph("R$ 0,20–0,80", S_KPI_VALUE)],
    [Paragraph("Budget teste\n14 dias", S_KPI_LABEL),
     Paragraph("Budget escala\nMês 2", S_KPI_LABEL),
     Paragraph("CPF esperado\naudiência fria", S_KPI_LABEL),
     Paragraph("CPF esperado\nretargeting", S_KPI_LABEL)],
]
bud_t = Table(bud_data, colWidths=[inner_w/4]*4)
bud_t.setStyle(TableStyle([
    ("BACKGROUND", (0,0),(-1,-1), ROSA_BG),
    ("BOX",        (0,0),(0,-1), 1, ROSA_LIGHT),
    ("BOX",        (1,0),(1,-1), 1, ROSA_LIGHT),
    ("BOX",        (2,0),(2,-1), 1, ROSA_LIGHT),
    ("BOX",        (3,0),(3,-1), 1, ROSA_LIGHT),
    ("ROWPADDING", (0,0),(-1,-1), 5),
    ("ALIGN",      (0,0),(-1,-1), "CENTER"),
]))
story.append(bud_t)
story.append(Spacer(1, 0.4*cm))

# ---- SEÇÃO 8 ----
story.append(section_header("08  Novos Conteúdos a Criar"))
story.append(Spacer(1, 0.3*cm))

conteudos = [
    ("1. Humor de Casal Curto  (9–15s)  ⚡ URGENTE",
     "Cena com expressão no rosto + texto <i>\"Alguém mais passa por isso?\"</i> Sem narração longa. "
     "A cena fala. <b>2 posts por semana mínimo.</b> Esse formato está zerado em Maio e é o único com taxa de share consistente de 1%."),
    ("2. Maternidade Emocional Silenciosa  (8–12s)",
     "Segundos 0–2: som ambiente (risada, choro suave) — sem música alta. Cena real, não encenada. "
     "Frase simples em texto, sem voz over. Temas: <i>\"A primeira vez que ele disse 'te amo, mãe'\"</i> · "
     "<i>\"Quando você percebe que tá dando certo\"</i>"),
    ("3. Versículo + Cena Real  (10–15s)",
     "Imagem da família (não estúdio). Versículo em texto sobre a imagem. Narração suave ou música cristã lo-fi. "
     "Final: <i>\"@julianamedeiiros_ — acompanha\"</i>. CPM mais baixo no Meta para audiências religiosas."),
    ("4. Marco / Conquista  (15–25s)",
     "Narrativa: momento simples → conquista → gratidão. Público 30–44 anos se identifica com construção de vida. "
     "Ideal para retargeting de quem já viu mas não seguiu ainda."),
]

for titulo, desc in conteudos:
    bloco = Table(
        [[Paragraph(titulo, style("ct", fontName="Helvetica-Bold", fontSize=9.5, textColor=ROSA, leading=13)),
          Paragraph(desc, style("cd", fontName="Helvetica", fontSize=9, textColor=PRETO, leading=13))
         ]],
        colWidths=[inner_w*0.30, inner_w*0.70]
    )
    bloco.setStyle(TableStyle([
        ("BACKGROUND", (0,0),(0,-1), ROSA_BG),
        ("BACKGROUND", (1,0),(1,-1), BRANCO),
        ("BOX", (0,0),(-1,-1), 0.5, ROSA_LIGHT),
        ("ROWPADDING", (0,0),(-1,-1), 7),
        ("VALIGN", (0,0),(-1,-1), "TOP"),
    ]))
    story.append(bloco)
    story.append(Spacer(1, 0.18*cm))

story.append(Spacer(1, 0.2*cm))

# ---- SEÇÃO 9 ----
story.append(section_header("09  Plano de Ação — 30 Dias"))
story.append(Spacer(1, 0.3*cm))

plano_headers = ["Semana", "Ação", "Meta"]
plano_rows = [
    ["Semana 1",    'Impulsionar "Um abraço bem apertado"\nR$ 20/dia · Mães 25–44 Brasil',
                    "Campanha ativa\nCPF alvo: R$ 0,80–1,50"],
    ["Semana 1",    "Criar 2 Reels de humor de casal\n(9–15s) — URGENTE",
                    "Recuperar\nshares/alcance"],
    ["Semana 2",    "Ativar 4 conjuntos de anúncios\nR$ 45/dia total · CBO ativado",
                    "Testar\nsegmentações"],
    ["Semanas 3–4", "Criar formatos: maternidade silenciosa\n+ versículo + marco/conquista",
                    "Novos criativos\npara campanha"],
    ["Dia 14",      "Revisar CPF por conjunto\nDobrar os 2 melhores · Pausar o pior",
                    "Otimizar\nROAS"],
]
plano_widths = [inner_w*0.15, inner_w*0.55, inner_w*0.30]
story.append(make_table(plano_headers, plano_rows, plano_widths))
story.append(Spacer(1, 0.3*cm))

kpi_strip = Table(
    [[Paragraph("KPIs a Monitorar", style("kl", fontName="Helvetica-Bold", fontSize=9, textColor=BRANCO, alignment=TA_CENTER)),
      Paragraph("CPF &lt; R$ 1,50", style("kv", fontName="Helvetica-Bold", fontSize=9, textColor=BRANCO, alignment=TA_CENTER)),
      Paragraph("CTR &gt; 1,5%", style("kv2", fontName="Helvetica-Bold", fontSize=9, textColor=BRANCO, alignment=TA_CENTER)),
      Paragraph("Frequência 1,5–2,5", style("kv3", fontName="Helvetica-Bold", fontSize=9, textColor=BRANCO, alignment=TA_CENTER)),
      Paragraph("CPM R$ 8–18", style("kv4", fontName="Helvetica-Bold", fontSize=9, textColor=BRANCO, alignment=TA_CENTER)),
    ]],
    colWidths=[inner_w*0.22, inner_w*0.20, inner_w*0.18, inner_w*0.22, inner_w*0.18]
)
kpi_strip.setStyle(TableStyle([
    ("BACKGROUND", (0,0),(0,-1), ROXO),
    ("BACKGROUND", (1,0),(-1,-1), ROSA),
    ("ROWPADDING", (0,0),(-1,-1), 7),
    ("GRID", (0,0),(-1,-1), 0.5, BRANCO),
    ("ALIGN", (0,0),(-1,-1), "CENTER"),
    ("VALIGN", (0,0),(-1,-1), "MIDDLE"),
]))
story.append(kpi_strip)

# ================================================================
doc.build(
    story,
    onFirstPage=on_first_page,
    onLaterPages=on_page,
)
print("PDF gerado com sucesso:", OUTPUT)
