from django.db import models

class Notificacao(models.Model):
    # dados gerais
    servidor = models.CharField(max_length=255, blank=True)
    data = models.DateField(null=True, blank=True)
    orgao = models.CharField(max_length=255, blank=True)
    unidade_notificadora = models.CharField(max_length=255, blank=True)

    # tipificação / acompanhamento
    motivo_violencia = models.CharField(max_length=255, blank=True)
    lesao_autoprovocada = models.CharField(max_length=50, blank=True)
    meio_agressao = models.CharField(max_length=255, blank=True)
    multipla_ocorrencia = models.CharField(max_length=50, blank=True)

    acompanhamento = models.CharField(max_length=100, blank=True)
    local_acompanhamento = models.CharField(max_length=255, blank=True)
    servico_inserido = models.CharField(max_length=255, blank=True)
    situacao_ruptura_psr = models.CharField(max_length=255, blank=True)
    outra_situacao = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Notificação #{self.id}"


class Violado(models.Model):
    notificacao = models.OneToOneField(
        Notificacao,
        on_delete=models.CASCADE,
        related_name="violado",
    )

    nome = models.CharField(max_length=255)
    nome_social = models.CharField(max_length=255, blank=True)
    nome_mae = models.CharField(max_length=255, blank=True)
    data_nasc = models.DateField(null=True, blank=True)

    cpf = models.CharField(max_length=14, blank=True)
    nis = models.CharField(max_length=20, blank=True)
    cartao_sus = models.CharField(max_length=30, blank=True)

    gestante = models.CharField(max_length=30, blank=True)
    is_migrante = models.BooleanField(default=False)
    nacionalidade = models.CharField(max_length=100, blank=True)
    naturalidade = models.CharField(max_length=100, blank=True)

    estado_civil = models.CharField(max_length=100, blank=True)
    raca = models.CharField(max_length=100, blank=True)
    sexo = models.CharField(max_length=50, blank=True)
    segmento_lgbtqiapn = models.CharField(max_length=100, blank=True)
    identidade_genero = models.CharField(max_length=100, blank=True)

    is_pcd = models.BooleanField(default=False)
    tipo_deficiencia = models.CharField(max_length=100, blank=True)
    deficiencia = models.CharField(max_length=100, blank=True)

    grau_instrucao = models.CharField(max_length=100, blank=True)
    ciclo_vida = models.CharField(max_length=100, blank=True)
    grupo_populacional = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.nome


class Violacao(models.Model):
    notificacao = models.ForeignKey(
        Notificacao,
        on_delete=models.CASCADE,
        related_name="violacoes",
    )
    tipo = models.CharField(max_length=100)

    def __str__(self):
        return self.tipo


class Violador(models.Model):
    notificacao = models.ForeignKey(
        Notificacao,
        on_delete=models.CASCADE,
        related_name="violadores",
    )
    sexo = models.CharField(max_length=50, blank=True)
    raca_etnia = models.CharField(max_length=100, blank=True)
    parentesco = models.CharField(max_length=100, blank=True)
    ciclo_vida = models.CharField(max_length=100, blank=True)
    susp_alcool_drogas = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"Violador #{self.id} - {self.parentesco or 'Sem parentesco'}"
