function FormRegistro() {
  return (
    <section>
      <h2>Regístrate</h2>

      <form>
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo" required />
        <button type="submit">Participar</button>
      </form>
    </section>
  );
}

export default FormRegistro;
