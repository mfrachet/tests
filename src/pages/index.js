import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

const Delay = 300;

const getPokemon = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    }, Delay);
  });
};

const ErrorBlock = styled.p`
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 8px;
  border-radius: 4px;

  &:focus {
    outline: 4px solid black;
  }
`;

const LoadingBlock = styled.p`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 8px;
  border-radius: 4px;
`;

export default function Index() {
  const mutation = useMutation(getPokemon);
  const errorBlockRef = useRef(null);
  const successBlockRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const pokemonId = formData.get("pokemonId");
    mutation.mutate(pokemonId);
  };

  const pokemonName = mutation?.data?.name;

  useEffect(() => {
    if (mutation.isError) {
      errorBlockRef.current.focus();
    }
  }, [mutation.isError]);

  useEffect(() => {
    if (pokemonName) {
      successBlockRef.current.focus();
    }
  }, [pokemonName]);

  return (
    <main aria-busy={mutation.isLoading}>
      {mutation.isLoading && (
        <LoadingBlock>
          <FormattedMessage id="loading" />
        </LoadingBlock>
      )}

      {mutation.isError && (
        <ErrorBlock tabIndex={-1} ref={errorBlockRef}>
          <FormattedMessage id="error" />
        </ErrorBlock>
      )}

      <h1>
        <FormattedMessage id="title" />
      </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-id">
          <FormattedMessage id="formLabel" />
          <br />
        </label>
        <input type="text" name="pokemonId" id="pokemon-id" />
        <button type="submit">
          <FormattedMessage id="submit" />
        </button>
      </form>

      {pokemonName && (
        <p tabIndex={-1} ref={successBlockRef}>
          Hello {pokemonName}
        </p>
      )}
    </main>
  );
}
