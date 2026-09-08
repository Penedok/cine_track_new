import { useState } from "react";
import { useCategory } from "../../context/CategoryContext";
import postCategoria from "../../../service/postCategoria";

export default function ModalNewCategory() {
  const { isCategoryModalOpen, closeCategoryModal, notifyCategoryCreated } = useCategory();
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const handleClose = () => {
    setNome("");
    setErro("");
    closeCategoryModal();
  };

  const handleSalvar = async () => {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) {
      setErro("Digite um nome para a categoria.");
      return;
    }

    setSalvando(true);
    setErro("");

    try {
      const response = await postCategoria(nomeLimpo);
      const categoriaValida =
        response && typeof response === "object" && typeof response.categoria === "string";

      if (categoriaValida) {
        notifyCategoryCreated(response);
        setNome("");
        closeCategoryModal();
      } else {
        setErro(typeof response === "string" ? response : "Não foi possível criar a categoria.");
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      setErro("Não foi possível criar a categoria.");
    } finally {
      setSalvando(false);
    }
  };

  if (!isCategoryModalOpen) return null;

  return (
    <div className="session-modal-overlay" onClick={handleClose}>
      <div
        className="session-modal category-modal"
        role="dialog"
        aria-labelledby="category-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="session-modal-header">
          <div>
            <h2 id="category-modal-title">Nova categoria</h2>
            <p>Cadastre uma categoria pra usar nos seus filmes.</p>
          </div>
          <button
            type="button"
            className="session-modal-close"
            onClick={handleClose}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </header>

        <div className="field field-wide">
          <span>Nome da categoria</span>
          <input
            type="text"
            className="session-modal-search"
            placeholder="Ex.: Terror, Comédia..."
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            autoFocus
          />
          {erro && <p className="session-modal-error">{erro}</p>}
        </div>

        <button
          className="session-modal-submit"
          type="button"
          onClick={handleSalvar}
          disabled={salvando}
        >
          {salvando ? "Salvando..." : "Salvar categoria"}
        </button>
      </div>
    </div>
  );
}
