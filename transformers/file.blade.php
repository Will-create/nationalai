@extends('layouts.master')
@section('content')
<header class="page-header page-header-dark pb-10"
    style="background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%);">
    <div class="container-xl px-4">
        <div class="page-header-content pt-4">
            <div class="row align-items-center justify-content-between">
                <div class="col-auto mt-4">
                    <h1 class="page-header-title">
                        <div class="page-header-icon"><i data-feather="activity"></i></div>
                        LOCATIONS ET CONTRATS
                    </h1>
                    <div class="page-header-subtitle mt-3">
                        <a class="btn btn-success" href="#!" class="btn btn-success" data-bs-toggle="modal"
                            data-bs-target="#formUserBackdrop">
                            Ajouter une nouvelle location
                        </a>
                    </div>
                </div>
                <div class="col-12 col-xl-auto mt-4">
                    <div class="input-group input-group-joined border-0" style="width: 16.5rem">
                        <span class="input-group-text"><i class="text-primary" data-feather="calendar"></i></span>
                        <div class="form-control ps-0 pointer">
                            {{ Carbon\Carbon::now()->format('d-m-Y') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- Main page content-->

<div class="container-xl px-4 mt-n10">
    <div class="row">
        <div class="col-lg-12">
            <!-- Tabbed dashboard card example-->
            <div class="card mb-4">
                <div class="card-body">
                    <table id="datatablesSimple">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Locataire</th>
                                <th>Bailleur</th>
                                <th>Maison</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($collection as $item)
                            <tr>
                                <td>{{ $item->code }}</td>
                                <td>{{ $item->Locataire->nom }} {{ $item->Locataire->prenom }}</td>
                                <td>{{ $item->Maison->Immeuble->Bailleur->nom }} {{
                                    $item->Maison->Immeuble->Bailleur->prenom }}</td>
                                <td>{{ $item->Maison->type_maison }} - {{ $item->Maison->adresse }}</td>
                                <td class="text-center">
                                    <a href="{{ route('Gestion_location.show', [$item->id]) }}">
                                        <i class="me-2 text-green" data-feather="eye"></i>
                                    </a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="formUserBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Ajouter une nouvelle location</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- Tabbed dashboard card example-->
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="sbp-preview-content">
                                    <form method="POST" action="{{ route('Gestion_location.store') }}">
                                        @csrf
                                        <div class="p-2 m-1"
                                            style="border: 2px solid rgb(242, 199, 174); border-radius: 5px;">
                                            <h6 class="m-2 text-center text-danger">Information sur le locataire</h6>
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12">
                                                    <div class="mb-3">
                                                        <label>Nom</label>
                                                        <select name="locataires_id" class="form-control">
                                                            <option value="">Selectionner ici...</option>
                                                            @foreach ($locataires as $item)
                                                            <option value="{{ $item->id }}">{{ $item->id }} - {{
                                                                $item->nom }} {{ $item->prenom }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="mb-3">
                                                        <label>Nom</label>
                                                        <input class="form-control" type="text" readonly />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="mb-3">
                                                        <label>Prénom</label>
                                                        <input class="form-control" type="text" readonly />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="mb-3">
                                                        <label>N° CNIB ou Passport</label>
                                                        <input class="form-control" type="text" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="mb-3">
                                                        <label>Téléphone</label>
                                                        <input class="form-control" type="text" readonly />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="mb-3">
                                                        <label>Date de naissance</label>
                                                        <input class="form-control" type="date" readonly />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="mb-3">
                                                        <label>Quartier</label>
                                                        <input class="form-control" type="text" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row p-2 m-1"
                                            style="border: 2px solid rgb(242, 199, 174); border-radius: 5px;">
                                            <h6 class="m-2 text-center text-danger">Information sur la maison</h6>
                                            <div class="col-lg-6 col-md-12">
                                                <div class="mb-3">
                                                    <label>Maison</label>
                                                    <select name="maisons_id" class="form-control" id="maisonsSelect">
                                                        <option value="">Selectionner ici...</option>
                                                        @foreach ($maisons as $item)
                                                        <option value="{{ $item->id }}" data-loyer="{{ $item->loyer }}"
                                                            data-immeuble="{{ $item->immeuble }}"
                                                            data-type="{{ $item->type_maison }}"
                                                            data-adresse="{{ $item->adresse }}">{{ $item->id }} - {{
                                                            $item->type_maison }} - {{ $item->loyer }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-12">
                                                <div class="mb-3">
                                                    <label>Loyer</label>
                                                    <input class="form-control" type="text" id="loyer" readonly />
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-12">
                                                <div class="mb-3">
                                                    <label>Immeuble</label>
                                                    <input class="form-control" type="text" id="immeuble" readonly />
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-12">
                                                <div class="mb-3">
                                                    <label>Type de maison</label>
                                                    <input class="form-control" type="text" id="typeMaison" readonly />
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-12">
                                                <div class="mb-3">
                                                    <label>Adresse</label>
                                                    <input class="form-control" type="text" id="adresse" readonly />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-3">
                                            <button type="submit" class="btn btn-success">Enregistrer</button>
                                            <button type="button" class="btn btn-danger"
                                                data-bs-dismiss="modal">Fermer</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.getElementById('maisonsSelect').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        document.getElementById('loyer').value = selectedOption.getAttribute('data-loyer');
        document.getElementById('immeuble').value = selectedOption.getAttribute('data-immeuble');
        document.getElementById('typeMaison').value = selectedOption.getAttribute('data-type');
        document.getElementById('adresse').value = selectedOption.getAttribute('data-adresse');
    });
</script>
@endsection