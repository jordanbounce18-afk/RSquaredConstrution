"""Backend tests for R2 Construction Estimate API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://build-estimate-44.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def created_ids():
    return []


VALID_PAYLOAD = {
    "name": "TEST_John Doe",
    "email": "test_john@example.com",
    "phone": "719-499-6248",
    "project_type": "Kitchen Remodel",
    "budget": "$25k-$50k",
    "timeline": "1-3 months",
    "address": "123 Test St, Colorado Springs, CO",
    "message": "Looking for a full kitchen remodel including cabinets and counters.",
}


# ====== Root health ======
def test_root_health(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


# ====== CREATE ======
def test_create_estimate_valid(session, created_ids):
    r = session.post(f"{API}/estimates", json=VALID_PAYLOAD)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["name"] == VALID_PAYLOAD["name"]
    assert data["email"] == VALID_PAYLOAD["email"]
    assert data["project_type"] == VALID_PAYLOAD["project_type"]
    assert data["status"] == "new"
    assert "id" in data and isinstance(data["id"], str)
    assert "created_at" in data
    created_ids.append(data["id"])


def test_create_estimate_invalid_email(session):
    payload = {**VALID_PAYLOAD, "email": "not-an-email"}
    r = session.post(f"{API}/estimates", json=payload)
    assert r.status_code == 422


def test_create_estimate_missing_required(session):
    payload = {"email": "x@example.com"}
    r = session.post(f"{API}/estimates", json=payload)
    assert r.status_code == 422


# ====== LIST ======
def test_list_estimates_sorted_desc(session, created_ids):
    # Create a second one to ensure ordering
    r = session.post(f"{API}/estimates", json={**VALID_PAYLOAD, "name": "TEST_Second", "email": "test_second@example.com"})
    assert r.status_code == 201
    created_ids.append(r.json()["id"])

    r = session.get(f"{API}/estimates")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert len(items) >= 2
    # Verify desc order by created_at
    dates = [it["created_at"] for it in items]
    assert dates == sorted(dates, reverse=True)


# ====== GET single ======
def test_get_estimate_by_id(session, created_ids):
    eid = created_ids[0]
    r = session.get(f"{API}/estimates/{eid}")
    assert r.status_code == 200
    assert r.json()["id"] == eid


def test_get_estimate_unknown_404(session):
    r = session.get(f"{API}/estimates/nonexistent-id-xyz")
    assert r.status_code == 404


# ====== PATCH status ======
@pytest.mark.parametrize("status", ["new", "reviewed", "contacted", "closed"])
def test_patch_estimate_valid_status(session, created_ids, status):
    eid = created_ids[0]
    r = session.patch(f"{API}/estimates/{eid}", json={"status": status})
    assert r.status_code == 200, r.text
    assert r.json()["status"] == status
    # verify persisted
    g = session.get(f"{API}/estimates/{eid}")
    assert g.json()["status"] == status


def test_patch_estimate_invalid_status(session, created_ids):
    eid = created_ids[0]
    r = session.patch(f"{API}/estimates/{eid}", json={"status": "bogus"})
    assert r.status_code == 400


def test_patch_estimate_unknown_404(session):
    r = session.patch(f"{API}/estimates/nonexistent-id-xyz", json={"status": "reviewed"})
    assert r.status_code == 404


# ====== STATS summary ======
def test_estimates_summary(session):
    r = session.get(f"{API}/estimates/stats/summary")
    assert r.status_code == 200
    data = r.json()
    for k in ("total", "new", "reviewed", "contacted", "closed"):
        assert k in data
        assert isinstance(data[k], int)
    assert data["total"] >= data["new"] + data["reviewed"] + data["contacted"] + data["closed"] - data["total"]


# ====== DELETE ======
def test_delete_estimate(session, created_ids):
    eid = created_ids.pop()
    r = session.delete(f"{API}/estimates/{eid}")
    assert r.status_code == 204
    g = session.get(f"{API}/estimates/{eid}")
    assert g.status_code == 404


def test_delete_unknown_404(session):
    r = session.delete(f"{API}/estimates/nonexistent-id-xyz")
    assert r.status_code == 404


# ====== Cleanup ======
def test_zz_cleanup(session, created_ids):
    for eid in list(created_ids):
        session.delete(f"{API}/estimates/{eid}")
    created_ids.clear()
