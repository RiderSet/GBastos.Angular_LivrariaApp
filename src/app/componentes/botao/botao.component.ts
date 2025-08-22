import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-botao',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent {
  texto = input<string>();
  icone = input<string>();
  rota = input<string | string[]>();
  tipo = input('button');  
  tipoDeBotao = input<'primario' | 'secundario'>('primario');

  private readonly classesBotao: Record<string, string> = {
    primario: 'botao-primario',
    secundario: 'botao-secundario'
  };

  get classeCss(): string {
    return this.classesBotao[this.tipoDeBotao()] || 'botao-primario';
  }
}