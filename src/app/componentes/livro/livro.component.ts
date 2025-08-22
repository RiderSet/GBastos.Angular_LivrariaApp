import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { BotaoComponent } from '../botao/botao.component';
import { LivroService } from '../../services/livro.service';
import { Livro } from './livro';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [
    CommonModule,
    BotaoComponent
  ],
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'] 
})
export class LivroComponent {
  livro = input.required<Livro>();
  excluirLivro = output<string>();

  constructor(private readonly livroService: LivroService) {}

  alternarFavorito() {
    const livroAtualizado = { ...this.livro(), favorito: !this.livro().favorito };

    this.livroService.atualizarFavorito(livroAtualizado).subscribe(() => {
      this.livro().favorito = livroAtualizado.favorito
    });
  }

  excluir(){
      this.excluirLivro.emit(this.livro().id);
    }
}